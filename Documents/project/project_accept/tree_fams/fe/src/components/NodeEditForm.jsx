import React, { useState, useEffect } from "react";
import { useWorkspace } from "../context/WorkspaceContext";
import { useAuth } from "../contexts/AuthContext";

const NodeEditForm = ({ memberId, onClose }) => {
  const { getMemberById, updateMember, currentFamily } = useWorkspace();
  const { token } = useAuth();
  const member = getMemberById(memberId);

  const [formData, setFormData] = useState({
    nama_depan: "",
    nama_belakang: "",
    gender: "Pria",
    tanggal_lahir: "",
    tempat_lahir: "",
    pekerjaan: "",
    biography: "",
    status_hidup: "Hidup",
    tanggal_wafat: "",
    contact_phone: "",
    contact_email: "",
    contact_address: "",
    photo_url: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Populate form with member data
  useEffect(() => {
    if (member) {
      setFormData({
        nama_depan: member.nama_depan || "",
        nama_belakang: member.nama_belakang || "",
        gender: member.gender || "Pria",
        tanggal_lahir: member.tanggal_lahir || "",
        tempat_lahir: member.tempat_lahir || "",
        pekerjaan: member.pekerjaan || "",
        biography: member.biography || "",
        status_hidup: member.status_hidup || member.status || "Hidup",
        tanggal_wafat: member.tanggal_wafat || member.tanggal_meninggal || "",
        contact_phone: member.contact_phone || "",
        contact_email: member.contact_email || "",
        contact_address: member.contact_address || "",
        photo_url: member.photo_url || "",
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:5200/api/families/${currentFamily.id}/members/${memberId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update member");
      }

      // Update local state
      updateMember(memberId, formData);

      setSuccess("Member information updated successfully!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message);
      console.error("Error updating member:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Member</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
            ✓ {success}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-h-96 overflow-y-auto"
        >
          {/* Basic Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Informasi Dasar
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nama Depan *
                </label>
                <input
                  type="text"
                  name="nama_depan"
                  value={formData.nama_depan}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nama Belakang
                </label>
                <input
                  type="text"
                  name="nama_belakang"
                  value={formData.nama_belakang}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Jenis Kelamin
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Status Hidup
                </label>
                <select
                  name="status_hidup"
                  value={formData.status_hidup}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  <option value="Hidup">Masih Hidup</option>
                  <option value="Meninggal">Meninggal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Birth & Death Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Informasi Kelahiran & Kematian
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tempat Lahir
                </label>
                <input
                  type="text"
                  name="tempat_lahir"
                  value={formData.tempat_lahir}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Kota, Provinsi"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Informasi Kontak
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Contoh: 08123456789"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Contoh: nama@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Alamat
                </label>
                <textarea
                  name="contact_address"
                  value={formData.contact_address}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Jalan, No., Kelurahan, Kecamatan, Kota, Provinsi"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Informasi Tambahan
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Pekerjaan
                </label>
                <input
                  type="text"
                  name="pekerjaan"
                  value={formData.pekerjaan}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Profesi atau pekerjaan"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photo_url"
                  value={formData.photo_url}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Biografi/Cerita
                </label>
                <textarea
                  name="biography"
                  value={formData.biography}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Tulis cerita atau informasi menarik tentang anggota keluarga ini..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 text-sm"
            >
              {submitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded font-semibold hover:bg-gray-400 transition disabled:bg-gray-300 text-sm"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NodeEditForm;
