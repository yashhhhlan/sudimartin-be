import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import DetailPage from "../components/DetailPage";

const API_URL = "http://localhost:5200";

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [showDetailPage, setShowDetailPage] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchAllUsers();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/${id}`);
      setUser(response.data.data);
      setFormData(response.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`);
      setAllUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/api/users/${id}`, formData);
      setUser(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const getRelation = (relation) => {
    const relations = {
      father: "Ayah",
      mother: "Ibu",
      spouse: "Pasangan",
      children: "Anak-anak",
      siblings: "Saudara",
    };
    return relations[relation] || relation;
  };

  const findUserById = (userId) => {
    return allUsers.find((u) => u.id === userId);
  };

  const getChildren = () => {
    return allUsers.filter(
      (u) => u.ayahId === user?.id || u.ibuId === user?.id
    );
  };

  const getSiblings = () => {
    if (!user?.ayahId && !user?.ibuId) return [];
    return allUsers.filter(
      (u) =>
        (u.ayahId === user?.ayahId || u.ibuId === user?.ibuId) &&
        u.id !== user?.id
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          User tidak ditemukan
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Kembali ke Home
        </button>
      </div>
    );
  }

  const father = user.ayahId ? findUserById(user.ayahId) : null;
  const mother = user.ibuId ? findUserById(user.ibuId) : null;
  const spouse = user.pasanganId ? findUserById(user.pasanganId) : null;
  const children = getChildren();
  const siblings = getSiblings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {user.namaDepan} {user.namaBelakang}
              </h1>
              <p className="text-blue-100">
                {user.gender === "Pria" ? "👨" : "👩"} {user.gender}
                {user.tempatLahir && ` • ${user.tempatLahir}`}
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold"
            >
              ← Kembali
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 Informasi Pribadi</h2>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    ✏️ Edit
                  </button>
                )}
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nama Depan"
                      value={formData.namaDepan}
                      onChange={(e) =>
                        setFormData({ ...formData, namaDepan: e.target.value })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Nama Belakang"
                      value={formData.namaBelakang}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          namaBelakang: e.target.value,
                        })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <input
                    type="date"
                    placeholder="Tanggal Lahir"
                    value={formData.tanggalLahir || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, tanggalLahir: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Tempat Lahir"
                    value={formData.tempatLahir}
                    onChange={(e) =>
                      setFormData({ ...formData, tempatLahir: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Pekerjaan"
                    value={formData.pekerjaan}
                    onChange={(e) =>
                      setFormData({ ...formData, pekerjaan: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setFormData(user);
                      }}
                      className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-semibold text-gray-600">
                      Jenis Kelamin:
                    </span>
                    <span>{user.gender}</span>
                  </div>
                  {user.tanggalLahir && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-semibold text-gray-600">
                        Tanggal Lahir:
                      </span>
                      <span>
                        {new Date(user.tanggalLahir).toLocaleDateString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  )}
                  {user.tempatLahir && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-semibold text-gray-600">
                        Tempat Lahir:
                      </span>
                      <span>{user.tempatLahir}</span>
                    </div>
                  )}
                  {user.pekerjaan && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-semibold text-gray-600">
                        Pekerjaan:
                      </span>
                      <span>{user.pekerjaan}</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Family Tree Summary */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-4">👨‍👩‍👧‍👦 Keluarga</h2>
              <div className="space-y-4">
                {father && (
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => navigate(`/user/${father.id}`)}
                    className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                  >
                    <div className="font-semibold">👨 Ayah</div>
                    <div className="text-sm text-gray-600">
                      {father.namaDepan} {father.namaBelakang}
                    </div>
                  </motion.button>
                )}

                {mother && (
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => navigate(`/user/${mother.id}`)}
                    className="w-full text-left p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition"
                  >
                    <div className="font-semibold">👩 Ibu</div>
                    <div className="text-sm text-gray-600">
                      {mother.namaDepan} {mother.namaBelakang}
                    </div>
                  </motion.button>
                )}

                {spouse && (
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => navigate(`/user/${spouse.id}`)}
                    className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                  >
                    <div className="font-semibold">💑 Pasangan</div>
                    <div className="text-sm text-gray-600">
                      {spouse.namaDepan} {spouse.namaBelakang}
                    </div>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Children */}
          {children.length > 0 && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="mt-8 bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-6">
                👶 Anak-Anak ({children.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {children.map((child) => (
                  <motion.button
                    key={child.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate(`/user/${child.id}`)}
                    className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg hover:shadow-lg transition border border-blue-200"
                  >
                    <div className="text-xl mb-2">
                      {child.gender === "Pria" ? "👦" : "👧"}
                    </div>
                    <div className="font-semibold">
                      {child.namaDepan} {child.namaBelakang}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Klik untuk lihat detail
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Siblings */}
          {siblings.length > 0 && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="mt-8 bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-6">
                👫 Saudara ({siblings.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {siblings.map((sibling) => (
                  <motion.button
                    key={sibling.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate(`/user/${sibling.id}`)}
                    className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg hover:shadow-lg transition border border-yellow-200"
                  >
                    <div className="text-xl mb-2">
                      {sibling.gender === "Pria" ? "👨" : "👩"}
                    </div>
                    <div className="font-semibold">
                      {sibling.namaDepan} {sibling.namaBelakang}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Klik untuk lihat detail
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* DetailPage Modal */}
      {showDetailPage && (
        <DetailPage
          member={user}
          onBack={() => setShowDetailPage(false)}
          onEdit={() => setEditMode(true)}
        />
      )}
    </div>
  );
}
