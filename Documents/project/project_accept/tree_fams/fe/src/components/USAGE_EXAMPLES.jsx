/**
 * CONTOH INTEGRASI Pro Family Tree Components
 * File ini menunjukkan cara mengintegrasikan komponen Pro Family Tree
 * ke dalam aplikasi yang sudah ada
 */

import React, { useState, useEffect } from "react";
import ProFamilyTreeVisualization from "./components/ProFamilyTreeVisualization";
import ProFamilyTreeCard from "./components/ProFamilyTreeCard";
import FamilyMemberAvatar from "./components/FamilyMemberAvatar";

/**
 * EXAMPLE 1: Simple Standalone Usage
 * Menampilkan diagram silsilah langsung dengan mock data
 */
export function SimpleExample() {
  const mockMembers = [
    {
      id: 1,
      nama_depan: "Ahmad",
      nama_belakang: "Hassan",
      gender: "M",
      status_hidup: "Hidup",
      status_menikah: "Menikah",
      generation: 1,
      photo_url: null,
      tanggal_lahir: "1970-01-15",
      tanggal_meninggal: null,
      ayah_id: null,
      ibu_id: null,
      partners: [
        { spouseId: 2, children: [{ id: 3 }, { id: 4 }] },
        { spouseId: 5, children: [{ id: 6 }] },
      ],
    },
    {
      id: 2,
      nama_depan: "Siti",
      nama_belakang: "Rahman",
      gender: "F",
      status_hidup: "Hidup",
      status_menikah: "Menikah",
      generation: 1,
      photo_url: null,
      tanggal_lahir: "1972-05-20",
      tanggal_meninggal: null,
      ayah_id: null,
      ibu_id: null,
      partners: [{ spouseId: 1, children: [{ id: 3 }, { id: 4 }] }],
    },
    {
      id: 5,
      nama_depan: "Fatimah",
      nama_belakang: "Ali",
      gender: "F",
      status_hidup: "Hidup",
      status_menikah: "Menikah",
      generation: 1,
      photo_url: null,
      tanggal_lahir: "1975-08-10",
      tanggal_meninggal: null,
      ayah_id: null,
      ibu_id: null,
      partners: [{ spouseId: 1, children: [{ id: 6 }] }],
    },
    {
      id: 3,
      nama_depan: "Hasan",
      nama_belakang: "Hassan",
      gender: "M",
      status_hidup: "Hidup",
      status_menikah: "Belum Menikah",
      generation: 2,
      photo_url: null,
      tanggal_lahir: "1990-03-10",
      tanggal_meninggal: null,
      ayah_id: 1,
      ibu_id: 2,
      partners: [],
    },
    {
      id: 4,
      nama_depan: "Nur",
      nama_belakang: "Hassan",
      gender: "F",
      status_hidup: "Hidup",
      status_menikah: "Menikah",
      generation: 2,
      photo_url: null,
      tanggal_lahir: "1992-07-22",
      tanggal_meninggal: null,
      ayah_id: 1,
      ibu_id: 2,
      partners: [],
    },
    {
      id: 6,
      nama_depan: "Aisha",
      nama_belakang: "Hassan",
      gender: "F",
      status_hidup: "Meninggal",
      status_menikah: "Belum Menikah",
      generation: 2,
      photo_url: null,
      tanggal_lahir: "1993-12-05",
      tanggal_meninggal: "2020-06-15",
      ayah_id: 1,
      ibu_id: 5,
      partners: [],
    },
  ];

  const handleEdit = (member) => {
    console.log("Edit member:", member);
    alert(`Edit ${member.nama_depan} (ID: ${member.id})`);
  };

  const handleDelete = (member) => {
    console.log("Delete member:", member);
    alert(`Delete ${member.nama_depan} (ID: ${member.id})`);
  };

  const handleAddSpouse = (member) => {
    console.log("Add spouse for:", member);
    alert(`Add spouse for ${member.nama_depan}`);
  };

  const handleAddChild = (member) => {
    console.log("Add child for:", member);
    alert(`Add child for ${member.nama_depan}`);
  };

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        📊 Contoh Diagram Silsilah Keluarga
      </h1>

      <ProFamilyTreeVisualization
        members={mockMembers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddSpouse={handleAddSpouse}
        onAddChild={handleAddChild}
      />
    </div>
  );
}

/**
 * EXAMPLE 2: Integration dengan Component Existing
 * Menunjukkan cara mengintegrasikan ke dalam FamilyDashboard
 */
export function IntegratedExample() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch members dari API
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      // Ganti URL dengan API endpoint yang sebenarnya
      const response = await fetch("/api/members");
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
      // Fallback ke empty array
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (member) => {
    // Navigate ke edit page
    window.location.href = `/member/${member.id}/edit`;
  };

  const handleDelete = async (member) => {
    if (window.confirm(`Yakin hapus ${member.nama_depan}?`)) {
      try {
        await fetch(`/api/members/${member.id}`, { method: "DELETE" });
        setMembers(members.filter((m) => m.id !== member.id));
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  const handleAddSpouse = (member) => {
    // Navigate ke form tambah pasangan
    sessionStorage.setItem(
      "addRelationTo",
      JSON.stringify({ parentId: member.id, type: "pasangan" })
    );
    window.location.href = "/add-member";
  };

  const handleAddChild = (member) => {
    // Navigate ke form tambah anak
    sessionStorage.setItem(
      "addRelationTo",
      JSON.stringify({ parentId: member.id, type: "anak" })
    );
    window.location.href = "/add-member";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading diagram...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <ProFamilyTreeVisualization
        members={members}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddSpouse={handleAddSpouse}
        onAddChild={handleAddChild}
      />
    </div>
  );
}

/**
 * EXAMPLE 3: Custom Card Display
 * Menunjukkan cara menggunakan ProFamilyTreeCard secara standalone
 */
export function CustomCardExample() {
  const primaryMember = {
    id: 1,
    nama_depan: "Ahmad",
    nama_belakang: "Hassan",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 1,
    photo_url: null,
    tanggal_lahir: "1970-01-15",
  };

  const spouses = [
    {
      id: 2,
      nama_depan: "Siti",
      nama_belakang: "Rahman",
      gender: "F",
      generation: 1,
      photo_url: null,
    },
    {
      id: 5,
      nama_depan: "Fatimah",
      nama_belakang: "Ali",
      gender: "F",
      generation: 1,
      photo_url: null,
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contoh Custom Card</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Single Card */}
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Single Member</h2>
            <ProFamilyTreeCard
              member={primaryMember}
              spouses={[]}
              generation={1}
              onEdit={(m) => console.log("Edit", m)}
              onDelete={(m) => console.log("Delete", m)}
              onAddSpouse={(m) => console.log("Add spouse", m)}
              onAddChild={(m) => console.log("Add child", m)}
            />
          </div>

          {/* Couple Card */}
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Couple (1 Spouse)</h2>
            <ProFamilyTreeCard
              member={primaryMember}
              spouses={spouses.slice(0, 1)}
              generation={1}
              onEdit={(m) => console.log("Edit", m)}
              onDelete={(m) => console.log("Delete", m)}
              onAddSpouse={(m) => console.log("Add spouse", m)}
              onAddChild={(m) => console.log("Add child", m)}
            />
          </div>

          {/* Multi-Spouse Card */}
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Multi-Spouse (2 Spouses)</h2>
            <ProFamilyTreeCard
              member={primaryMember}
              spouses={spouses}
              generation={1}
              onEdit={(m) => console.log("Edit", m)}
              onDelete={(m) => console.log("Delete", m)}
              onAddSpouse={(m) => console.log("Add spouse", m)}
              onAddChild={(m) => console.log("Add child", m)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * EXAMPLE 4: Avatar Component Showcase
 */
export function AvatarShowcaseExample() {
  const members = [
    {
      id: 1,
      nama_depan: "Ahmad",
      gender: "M",
      photo_url: null,
      status_hidup: "Hidup",
    },
    {
      id: 2,
      nama_depan: "Siti",
      gender: "F",
      photo_url: null,
      status_hidup: "Hidup",
    },
    {
      id: 3,
      nama_depan: "Hasan",
      gender: "M",
      photo_url: null,
      status_hidup: "Meninggal",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Avatar Showcase</h1>

      <div className="bg-white p-8 rounded-lg">
        <div className="space-y-8">
          {/* Size Variants */}
          <div>
            <h2 className="text-xl font-bold mb-4">Size Variants</h2>
            <div className="flex gap-8 items-end">
              {["small", "medium", "large", "xlarge"].map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <FamilyMemberAvatar member={members[0]} size={size} />
                  <p className="text-sm text-gray-600">{size}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Variants */}
          <div>
            <h2 className="text-xl font-bold mb-4">Gender Variants</h2>
            <div className="flex gap-8">
              {members.slice(0, 2).map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center gap-2"
                >
                  <FamilyMemberAvatar member={member} size="large" />
                  <p className="text-sm text-gray-600">{member.nama_depan}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deceased Variant */}
          <div>
            <h2 className="text-xl font-bold mb-4">Deceased Member</h2>
            <div className="flex gap-8 items-center">
              <div className="flex flex-col items-center gap-2">
                <FamilyMemberAvatar member={members[2]} size="large" />
                <p className="text-sm text-gray-600">{members[2].nama_depan}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * EXAMPLE 5: Data Transformation Helper
 * Menunjukkan cara mentransform data dari format lama ke format baru
 */
export const DataTransformationExamples = {
  /**
   * Transform format lama (individual relationships) ke format baru (partners array)
   */
  transformToNewFormat: (oldMember, allMembers) => {
    const spouses = allMembers.filter(
      (m) =>
        m.generation === oldMember.generation &&
        m.status_menikah === "Menikah" &&
        m.id !== oldMember.id
    );

    return {
      ...oldMember,
      partners: spouses.map((spouse) => {
        const children = allMembers.filter(
          (m) =>
            (m.ayah_id === oldMember.id && m.ibu_id === spouse.id) ||
            (m.ayah_id === spouse.id && m.ibu_id === oldMember.id)
        );
        return {
          spouseId: spouse.id,
          children: children.map((c) => ({ id: c.id })),
        };
      }),
    };
  },

  /**
   * Transform format baru ke format lama (untuk backward compatibility)
   */
  transformToOldFormat: (newMember) => {
    return {
      ...newMember,
      // Hubungan partner ditangani melalui ayah_id/ibu_id pada children
      // Format lama tidak perlu partners array
    };
  },
};

/**
 * Export contoh yang digunakan
 */
export default {
  SimpleExample,
  IntegratedExample,
  CustomCardExample,
  AvatarShowcaseExample,
  DataTransformationExamples,
};

/**
 * CATATAN INTEGRASI:
 *
 * 1. Jika menggunakan dengan FamilyDashboard yang existing:
 *    - Ganti FamilyTreeNode dengan ProFamilyTreeCard
 *    - Ganti FamilyTreeVisualization dengan ProFamilyTreeVisualization
 *
 * 2. Untuk backward compatibility:
 *    - Komponen masih support format data lama
 *    - Fallback logic akan mencari spouses dari status_menikah
 *    - Connector lines akan bekerja dengan ayah_id/ibu_id
 *
 * 3. Features yang baru:
 *    - Multi-spouse support (lebih dari 1 pasangan)
 *    - Smart layout yang auto-adjust
 *    - Sidebar action buttons dengan smooth animation
 *    - Responsive design untuk mobile
 *    - Toggle connector lines
 *    - Generation filtering
 *
 * 4. Performance tips:
 *    - Gunakan React.memo untuk card components jika banyak members
 *    - Implement virtual scrolling untuk > 100 members
 *    - Optimize SVG rendering dengan useMemo
 */
