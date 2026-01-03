import React, { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProFamilyTreeCard from "./ProFamilyTreeCard";

/**
 * ProFamilyTreeVisualization Component
 * Diagram silsilah keluarga yang dinamis dengan support multi-spouse
 *
 * Data Model:
 * {
 *   id: number,
 *   nama_depan: string,
 *   nama_belakang: string,
 *   gender: 'M' | 'Pria' | 'Laki-laki' | 'F' | 'Wanita' | 'Perempuan',
 *   status_hidup: 'Hidup' | 'Meninggal',
 *   photo_url: string,
 *   tanggal_lahir: string,
 *   tanggal_meninggal: string,
 *   generation: number,
 *   ayah_id: number,
 *   ibu_id: number,
 *   partners: [{ spouseId: number, children: [{ id: number }] }],
 * }
 */
export default function ProFamilyTreeVisualization({
  members = [],
  onEdit = () => {},
  onDelete = () => {},
  onAddSpouse = () => {},
  onAddChild = () => {},
}) {
  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const [showConnectorLines, setShowConnectorLines] = useState(true);
  const [startGen, setStartGen] = useState(1);
  const [endGen, setEndGen] = useState(5);
  const [forceRender, setForceRender] = useState(0);

  // Re-render lines when members or window size changes
  useEffect(() => {
    const timer = setTimeout(() => setForceRender((prev) => prev + 1), 100);
    window.addEventListener("resize", () => setForceRender((prev) => prev + 1));
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", () => {});
    };
  }, [members]);

  if (!members || members.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg font-medium">
          📋 Belum ada anggota keluarga
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Mulai dengan menambahkan anggota pertama
        </p>
      </div>
    );
  }

  // ============ DATA GROUPING & PROCESSING ============

  /**
   * Group members by generation
   */
  const byGeneration = useMemo(() => {
    const grouped = {};
    members.forEach((m) => {
      const gen = m.generation || 1;
      if (!grouped[gen]) grouped[gen] = [];
      grouped[gen].push(m);
    });
    return grouped;
  }, [members]);

  const sortedGens = useMemo(
    () =>
      Object.keys(byGeneration)
        .map(Number)
        .sort((a, b) => a - b),
    [byGeneration]
  );

  const allGenerations = useMemo(
    () =>
      sortedGens.map((gen) => ({
        value: gen,
        label: `Generasi ${gen}`,
      })),
    [sortedGens]
  );

  /**
   * Find all spouses of a member using partner relationships
   * @param {Object} member - The member to find spouses for
   * @returns {Array} Array of spouse objects
   */
  const findSpouses = (member) => {
    // Method 1: Check partners array (new format)
    if (member.partners && Array.isArray(member.partners)) {
      return member.partners
        .map((p) => members.find((m) => m.id === p.spouseId))
        .filter(Boolean);
    }

    // Method 2: Look for members with same generation and menikah status (fallback)
    if (member.status_menikah === "Menikah") {
      const spouses = members.filter(
        (m) =>
          m.id !== member.id &&
          m.generation === member.generation &&
          m.status_menikah === "Menikah"
      );
      return spouses;
    }

    return [];
  };

  /**
   * Get children grouped by their mother/spouse
   * @param {Object} member - The parent member
   * @returns {Array} Array of objects with spouse and their children
   */
  const getChildrenBySpouse = (member) => {
    const spouses = findSpouses(member);

    // Method 1: Use partners array format (if available)
    if (
      member.partners &&
      Array.isArray(member.partners) &&
      member.partners.length > 0
    ) {
      return member.partners.map((partner) => {
        const spouse = members.find((m) => m.id === partner.spouseId);
        const childIds = partner.children?.map((c) => c.id) || [];
        const childrenWithSpouse = members.filter((m) =>
          childIds.includes(m.id)
        );
        return { spouse, children: childrenWithSpouse };
      });
    }

    // Method 2: Use ayah_id/ibu_id format (with bi-directional checking)
    if (spouses.length === 0) {
      // Single parent - find all children
      // Check:
      // 1. Children with ayah_id or ibu_id = member.id
      // 2. Children with only ayah_id or only ibu_id = member.id (even if other parent not set)
      const allChildren = members.filter((m) => {
        // Direct parent-child relationship
        if (m.ayah_id === member.id || m.ibu_id === member.id) return true;

        // If only one parent is set, we still show as related
        if (
          member.gender === "M" ||
          member.gender === "Pria" ||
          member.gender === "m"
        ) {
          return m.ayah_id === member.id; // Male parent, check father field only
        } else {
          return m.ibu_id === member.id; // Female parent, check mother field only
        }
      });
      return [{ spouse: null, children: allChildren }];
    }

    // Method 3: Use ayah_id/ibu_id with spouse matching
    return spouses.map((spouse) => {
      const childrenWithSpouse = members.filter((m) => {
        // Both parents set and match
        if (m.ayah_id && m.ibu_id) {
          return (
            (m.ayah_id === member.id && m.ibu_id === spouse.id) ||
            (m.ayah_id === spouse.id && m.ibu_id === member.id)
          );
        }
        // Only one parent set - accept it
        return (
          m.ayah_id === member.id ||
          m.ayah_id === spouse.id ||
          m.ibu_id === member.id ||
          m.ibu_id === spouse.id
        );
      });
      return { spouse, children: childrenWithSpouse };
    });
  };

  /**
   * Generate connector lines (SVG) for parent-child relationships
   * Groups are separated by mother/spouse
   */
  const generateConnectorLines = () => {
    if (!containerRef.current) return [];

    const lines = [];
    const processedParents = new Set();
    const containerRect = containerRef.current.getBoundingClientRect();

    members.forEach((parent) => {
      const childrenBySpouse = getChildrenBySpouse(parent);

      // Skip if already processed (for couples)
      if (processedParents.has(parent.id)) return;
      processedParents.add(parent.id);

      const spouses = findSpouses(parent);
      let parentNode = nodeRefs.current[`node-${parent.id}`];
      if (!parentNode) return;

      let parentRect = parentNode.getBoundingClientRect();
      const parentX =
        parentRect.left - containerRect.left + parentRect.width / 2;
      const parentY = parentRect.top - containerRect.top + parentRect.height;

      // If has spouses, use the space between parent and last spouse
      if (spouses.length > 0) {
        const lastSpouse = spouses[spouses.length - 1];
        const spouseNode = nodeRefs.current[`node-${lastSpouse.id}`];
        if (spouseNode) {
          const spouseRect = spouseNode.getBoundingClientRect();
          const spouseX =
            spouseRect.left - containerRect.left + spouseRect.width / 2;
          parentNode = nodeRefs.current[`node-${parent.id}`];
          parentRect = parentNode.getBoundingClientRect();
          // Center between parent and spouse
          // parentX = (parentX + spouseX) / 2;
        }
      }

      // Process children by spouse groups
      childrenBySpouse.forEach((group, groupIdx) => {
        const { children } = group;
        if (children.length === 0) return;

        try {
          // Get child positions
          const childRects = children
            .map((child) => {
              const node = nodeRefs.current[`node-${child.id}`];
              if (!node) return null;
              const rect = node.getBoundingClientRect();
              return {
                child,
                x: rect.left - containerRect.left + rect.width / 2,
                y: rect.top - containerRect.top,
              };
            })
            .filter(Boolean);

          if (childRects.length === 0) return;

          const gap = 20;
          const childMinX = Math.min(...childRects.map((c) => c.x));
          const childMaxX = Math.max(...childRects.map((c) => c.x));
          const childMidY = childRects[0]?.y || 0;
          const parentToChildMidY = (parentY + childMidY) / 2;

          // Main vertical line from parent
          lines.push(
            <line
              key={`v-line-${parent.id}-${groupIdx}`}
              x1={parentX}
              y1={parentY + gap}
              x2={parentX}
              y2={parentToChildMidY}
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.7"
            />
          );

          // Horizontal line connecting all children in group
          if (childRects.length > 1) {
            lines.push(
              <line
                key={`h-line-${parent.id}-${groupIdx}`}
                x1={childMinX}
                y1={parentToChildMidY}
                x2={childMaxX}
                y2={parentToChildMidY}
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"
              />
            );
          }

          // Vertical lines from horizontal to each child
          childRects.forEach((childRect, idx) => {
            const fromY =
              childRects.length > 1 ? parentToChildMidY : parentToChildMidY;

            lines.push(
              <g key={`child-${parent.id}-${groupIdx}-${idx}`}>
                <line
                  x1={childRect.x}
                  y1={fromY}
                  x2={childRect.x}
                  y2={childRect.y - gap}
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                {/* Arrow pointing to child */}
                <polygon
                  points={`${childRect.x},${childRect.y - 8} ${
                    childRect.x - 4
                  },${childRect.y - 15} ${childRect.x + 4},${childRect.y - 15}`}
                  fill="#1e40af"
                />
              </g>
            );
          });
        } catch (e) {
          console.error("Error rendering connector lines:", e);
        }
      });
    });

    return lines;
  };

  // Filter generations based on selected range
  const filteredGens = useMemo(() => {
    return sortedGens.filter((gen) => gen >= startGen && gen <= endGen);
  }, [sortedGens, startGen, endGen]);

  // Debug: Log children count per member
  useEffect(() => {
    members.forEach((member) => {
      const childrenBySpouse = getChildrenBySpouse(member);
      const totalChildren = childrenBySpouse.reduce(
        (sum, group) => sum + group.children.length,
        0
      );
      if (totalChildren > 0) {
        console.log(
          `${member.nama_depan} (ID: ${member.id}) has ${totalChildren} children`
        );
      }
    });
  }, [members]);

  // ============ RENDER ============

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden">
      {/* Header - Generation Selector */}
      <div className="p-4 md:p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base md:text-lg font-bold text-gray-700">
            📊 Pilih Rentang Generasi
          </h3>
          <button
            onClick={() => setShowConnectorLines(!showConnectorLines)}
            title="Toggle garis keturunan"
            className="px-3 py-1.5 text-xs font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-200"
          >
            {showConnectorLines ? "🔌 Sembunyikan" : "🔌 Tampilkan"} Garis
          </button>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Generation */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Generasi Awal
            </label>
            <select
              value={startGen}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setStartGen(val);
                if (val > endGen) setEndGen(val + 4);
              }}
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white text-gray-700 font-medium transition-all duration-200"
            >
              {allGenerations.map((gen) => (
                <option key={gen.value} value={gen.value}>
                  {gen.label}
                </option>
              ))}
            </select>
          </div>

          {/* End Generation */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Generasi Akhir
            </label>
            <select
              value={endGen}
              onChange={(e) => setEndGen(parseInt(e.target.value))}
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white text-gray-700 font-medium transition-all duration-200"
            >
              {allGenerations
                .filter((gen) => gen.value >= startGen)
                .map((gen) => (
                  <option key={gen.value} value={gen.value}>
                    {gen.label}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r flex gap-3">
          <span className="text-2xl">ⓘ</span>
          <div>
            <p className="text-sm text-blue-700 font-medium">
              Menampilkan {filteredGens.length} generasi
            </p>
            <p className="text-xs text-blue-600 mt-1">
              {filteredGens.length > 0
                ? `Dari generasi ${startGen}${
                    startGen !== endGen ? ` hingga generasi ${endGen}` : ""
                  }`
                : "Pilih generasi untuk melihat anggota keluarga"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Diagram Container */}
      <div
        ref={containerRef}
        className="w-full overflow-auto bg-white relative"
        style={{ minHeight: "600px", maxHeight: "1200px" }}
      >
        {/* SVG Connector Lines */}
        {showConnectorLines && (
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              zIndex: 1,
              minHeight: "100%",
              minWidth: "100%",
            }}
            preserveAspectRatio="none"
          >
            {generateConnectorLines()}
          </svg>
        )}

        {/* Diagram Content */}
        <div className="relative z-10 p-4 md:p-8 space-y-12 md:space-y-16">
          {filteredGens.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 font-medium">
                Tidak ada anggota di rentang generasi yang dipilih
              </p>
            </div>
          ) : (
            filteredGens.map((gen, genIdx) => (
              <div key={`gen-${gen}`}>
                {/* Members Grid - Responsive Flex Wrap */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 px-2">
                  {byGeneration[gen]
                    .sort((a, b) => a.id - b.id) // Sort by ID to maintain consistency
                    .map((member) => {
                      const spouses = findSpouses(member);

                      // Skip rendering spouse if this is the spouse of someone we already rendered
                      const isMemberAlreadyRenderedAsSpouse = byGeneration[gen]
                        .filter((m) => m.id < member.id)
                        .some((m) =>
                          findSpouses(m).some((s) => s.id === member.id)
                        );

                      if (isMemberAlreadyRenderedAsSpouse) return null;

                      return (
                        <div
                          key={`node-${member.id}`}
                          ref={(el) => {
                            if (el) nodeRefs.current[`node-${member.id}`] = el;
                          }}
                        >
                          <ProFamilyTreeCard
                            member={member}
                            spouses={spouses}
                            generation={gen}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onAddSpouse={onAddSpouse}
                            onAddChild={onAddChild}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
        <p className="font-medium mb-1">💡 Tips:</p>
        <ul className="space-y-1 text-gray-600">
          <li>
            • Hover pada kartu untuk melihat tombol aksi (Edit, Hapus, Tambah)
          </li>
          <li>• Tombol "+Pasangan" muncul untuk anggota yang belum menikah</li>
          <li>• Garis biru menunjukkan hubungan orang tua - anak</li>
          <li>• Kelompok anak dipisahkan berdasarkan ibu mereka</li>
        </ul>
      </div>
    </div>
  );
}
