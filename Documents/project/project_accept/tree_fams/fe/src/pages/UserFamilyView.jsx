import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ChevronLeft } from "lucide-react";
import ProFamilyTreeVisualization from "../components/ProFamilyTreeVisualization";

const UserFamilyView = () => {
  const navigate = useNavigate();
  const { familyId } = useParams();
  const { token } = useAuth();

  const [family, setFamily] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch family and members on mount
  useEffect(() => {
    if (familyId && token) {
      fetchFamilyData();
    }
  }, [familyId, token]);

  const fetchFamilyData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch family details
      const familyRes = await fetch(
        `http://localhost:5200/api/families/${familyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!familyRes.ok) {
        throw new Error("Keluarga tidak ditemukan");
      }

      const familyData = await familyRes.json();
      const family = familyData.data;

      // Check if family is public
      if (
        family.privacy_type !== "public" &&
        family.privacy_type !== "PUBLIC"
      ) {
        throw new Error("Anda tidak memiliki akses ke keluarga ini");
      }

      setFamily(family);

      // Fetch family members
      const membersRes = await fetch(
        `http://localhost:5200/api/families/${familyId}/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (membersRes.ok) {
        const membersData = await membersRes.json();
        setMembers(membersData.data || []);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching family data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !family) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Akses Ditolak
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "Keluarga tidak ditemukan"}
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
            >
              <ChevronLeft size={20} />
              Kembali
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {family.nama_keluarga}
              </h1>
              {family.deskripsi && (
                <p className="text-gray-600 mt-1">{family.deskripsi}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Family Tree Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pohon Keluarga
          </h2>

          {members.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Belum ada anggota keluarga dalam silsilah ini
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-4 text-sm text-gray-600">
                Total: <span className="font-semibold">{members.length}</span>{" "}
                anggota
              </div>
              <ProFamilyTreeVisualization members={members} />
            </div>
          )}
        </div>

        {/* Members List */}
        {members.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Daftar Anggota
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  {member.photo_url && (
                    <img
                      src={member.photo_url}
                      alt={member.nama_depan}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="font-bold text-gray-900">
                    {member.nama_depan} {member.nama_belakang}
                  </h3>
                  {member.tanggal_lahir && (
                    <p className="text-sm text-gray-600">
                      Lahir: {member.tanggal_lahir}
                    </p>
                  )}
                  {member.pekerjaan && (
                    <p className="text-sm text-gray-600">{member.pekerjaan}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserFamilyView;
