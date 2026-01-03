import React, { useState, useMemo, useRef, useEffect } from "react";
import { Edit2, Trash2, X, Plus, ChevronLeft } from "lucide-react";
import FamilyTreeNode from "./FamilyTreeNode";

export default function FamilyTreeVisualization({
  members = [],
  onEdit = () => {},
  onDelete = () => {},
  onAddChild = () => {},
}) {
  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const [forceRender, setForceRender] = useState(0);
  const [startGen, setStartGen] = useState(1);
  const [endGen, setEndGen] = useState(5);

  const getStatusIcon = (status) => (status === "Meninggal" ? "†" : "●");
  const getStatusColor = (status) =>
    status === "Meninggal" ? "text-gray-400" : "text-green-500";

  const getPhotoDisplay = (member) => {
    if (!member.photo_url) return null;
    return member.photo_url.startsWith("data:")
      ? member.photo_url
      : member.photo_url;
  };

  // Find spouse for couple layout
  // Cari pasangan: menikah + sama generasi + hubungan = Pasangan
  // Fallback: kalau tidak ada "Pasangan", cari yang menikah di generasi sama
  const findSpouse = (member) => {
    if (member.status_menikah !== "Menikah") return null;

    // Primary: cari dengan hubungan_keluarga = "Pasangan"
    let spouse = members.find(
      (m) =>
        m.id !== member.id &&
        m.generation === member.generation &&
        m.hubungan_keluarga === "Pasangan" &&
        m.status_menikah === "Menikah"
    );

    // Fallback: kalau tidak ada, cari yang menikah di generasi sama
    if (!spouse) {
      spouse = members.find(
        (m) =>
          m.id !== member.id &&
          m.generation === member.generation &&
          m.status_menikah === "Menikah"
      );
    }

    return spouse;
  };

  // Get children of a member - fokus pada garis sedarah saja
  // Filter: parent IDs + hubungan_keluarga = "Anak"
  const getChildren = (member) => {
    return members.filter(
      (m) =>
        (m.ayah_id === member.id || m.ibu_id === member.id) &&
        m.hubungan_keluarga === "Anak"
    );
  };

  // Force re-draw lines on mount and when members change
  useEffect(() => {
    const timer = setTimeout(() => setForceRender((prev) => prev + 1), 100);
    return () => clearTimeout(timer);
  }, [members]);

  if (!members || members.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Belum ada anggota keluarga</p>
      </div>
    );
  }

  // Group by generation
  const byGeneration = useMemo(() => {
    const grouped = {};
    members.forEach((m) => {
      const gen = m.generation || 0;
      if (!grouped[gen]) grouped[gen] = [];
      grouped[gen].push(m);
    });
    return grouped;
  }, [members]);

  const sortedGens = Object.keys(byGeneration)
    .map(Number)
    .sort((a, b) => a - b);

  // Generate SVG lines for ALL parent-child connections
  const generateConnectorLines = () => {
    const lines = [];
    const processedParents = new Set();

    members.forEach((parent) => {
      const children = getChildren(parent);
      if (children.length === 0) return;

      // Hanya proses dari yang punya ID lebih kecil (untuk couples)
      if (processedParents.has(parent.id)) return;
      processedParents.add(parent.id);

      const parentNode = nodeRefs.current[`node-${parent.id}`];
      if (!parentNode || !containerRef.current) return;

      try {
        const parentRect = parentNode.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const parentX =
          parentRect.left - containerRect.left + parentRect.width / 2;
        const parentY = parentRect.top - containerRect.top + parentRect.height;

        // Get all children nodes
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
            key={`v-line-${parent.id}`}
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

        // Horizontal line connecting all children
        lines.push(
          <line
            key={`h-line-${parent.id}`}
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

        // Vertical lines from horizontal to each child
        childRects.forEach((childRect, idx) => {
          lines.push(
            <g key={`child-${parent.id}-${idx}`}>
              {/* Line from horizontal to child */}
              <line
                x1={childRect.x}
                y1={parentToChildMidY}
                x2={childRect.x}
                y2={childRect.y - gap}
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"
              />
              {/* Arrow */}
              <polygon
                points={`${childRect.x},${childRect.y - 8} ${childRect.x - 4},${
                  childRect.y - 15
                } ${childRect.x + 4},${childRect.y - 15}`}
                fill="#1e40af"
              />
            </g>
          );
        });
      } catch (e) {
        // Skip if positions not available yet
      }
    });

    return lines;
  };

  // Get available generations for dropdowns
  const allGenerations = useMemo(() => {
    const gens = new Set();
    members.forEach((m) => {
      gens.add((m.generation || 0) + 1);
    });
    return Array.from(gens).sort((a, b) => a - b);
  }, [members]);

  // Filter generations based on selected range
  // Note: startGen and endGen are 1-indexed (Generasi 1, 2, 3...)
  // but sortedGens are 0-indexed (0, 1, 2...) so we subtract 1 for comparison
  const filteredGens = useMemo(() => {
    return sortedGens.filter((gen) => gen + 1 >= startGen && gen + 1 <= endGen);
  }, [sortedGens, startGen, endGen]);

  return (
    <div className="w-full bg-white rounded-lg">
      {/* Generation Range Selector */}
      <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <h3 className="text-base md:text-lg font-bold text-gray-700 mb-4">
          Pilih Rentang Generasi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Start Generation */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Pilih generasi awal
            </label>
            <select
              value={startGen}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setStartGen(val);
                if (val > endGen) setEndGen(val + 4);
              }}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
            >
              {allGenerations.map((gen) => (
                <option key={gen} value={gen}>
                  Generasi {gen}
                </option>
              ))}
            </select>
          </div>

          {/* End Generation */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Pilih generasi akhir
            </label>
            <select
              value={endGen}
              onChange={(e) => setEndGen(parseInt(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
            >
              {allGenerations
                .filter((gen) => gen >= startGen)
                .map((gen) => (
                  <option key={gen} value={gen}>
                    Generasi {gen}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded flex gap-2">
          <span className="text-blue-600 font-bold text-lg">ⓘ</span>
          <p className="text-sm text-blue-700">
            Menampilkan {filteredGens.length} generasi dari generasi {startGen}
            {startGen !== endGen && ` hingga generasi ${endGen}`}
          </p>
        </div>
      </div>

      {/* Diagram Container */}
      <div
        ref={containerRef}
        className="w-full overflow-auto bg-white p-4 md:p-8 rounded-b-lg relative"
        style={{ minHeight: "800px" }}
      >
        <svg
          className="absolute top-0 left-0 w-full h-full"
          style={{
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {generateConnectorLines()}
        </svg>

        <div className="relative z-10 space-y-12 md:space-y-24">
          {filteredGens.map((gen, idx) => (
            <div key={gen} className="space-y-4 md:space-y-8">
              {/* Generation Label - HIDDEN */}
              {/* <div className="text-center">
                <span className="inline-block bg-blue-100 text-blue-700 px-4 md:px-6 py-2 rounded-full font-bold text-xs md:text-sm">
                  Generasi {gen + 1}
                </span>
              </div> */}

              {/* Members in generation - Allow flexible layout */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 px-2 md:px-4 lg:px-6">
                {byGeneration[gen].map((member) => {
                  const spouse = findSpouse(member);
                  const isCouple = member.status_menikah === "Menikah";

                  // Skip spouse if already rendered (avoid duplicates)
                  if (isCouple && spouse && member.id > spouse.id) {
                    return null;
                  }

                  return (
                    <div
                      key={member.id}
                      ref={(el) => {
                        if (el) nodeRefs.current[`node-${member.id}`] = el;
                      }}
                      className="flex flex-col items-center"
                    >
                      {/* Node(s) */}
                      <div className="flex gap-1 md:gap-2 items-center justify-center bg-white p-3 md:p-4 rounded-lg border border-gray-100 shadow-sm">
                        <FamilyTreeNode
                          member={member}
                          couple={null}
                          generation={gen}
                          type="single"
                          onEdit={onEdit}
                          onDelete={onDelete}
                          onAddChild={onAddChild}
                        />
                        {spouse && (
                          <>
                            <div className="text-xl md:text-2xl text-red-400 font-bold">
                              ♥
                            </div>
                            <FamilyTreeNode
                              member={spouse}
                              couple={null}
                              generation={gen}
                              type="single"
                              onEdit={onEdit}
                              onDelete={onDelete}
                              onAddChild={onAddChild}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
