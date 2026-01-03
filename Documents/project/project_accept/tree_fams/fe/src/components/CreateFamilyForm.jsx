import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { X } from "lucide-react";

const CreateFamilyForm = ({ onClose, onFamilyCreated }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    nama_keluarga: "",
    deskripsi: "",
    privacy_type: "private",
    photo_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo_url: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.nama_keluarga.trim()) {
        throw new Error("Nama keluarga harus diisi");
      }

      const response = await fetch("http://localhost:5200/api/families", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal membuat keluarga");
      }

      onFamilyCreated(data.data);
    } catch (err) {
      setError(err.message);
      console.error("Error creating family:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Buat Keluarga Baru
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Photo Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Foto Keluarga (Opsional)
            </label>
            <div className="flex gap-6">
              {/* Photo Preview */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                  {formData.photo_url ? (
                    <img
                      src={formData.photo_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Upload Input */}
              <div className="flex-1 flex flex-col justify-center">
                <label
                  htmlFor="photo-upload"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer text-sm font-semibold text-center"
                >
                  Pilih Foto
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  disabled={loading}
                  className="hidden"
                />
                <p className="text-gray-500 text-sm mt-2">
                  Format: JPG, PNG (Maks 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Nama Keluarga */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Keluarga <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama_keluarga"
              placeholder="Contoh: Keluarga Besar Muis"
              value={formData.nama_keluarga}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Deskripsi */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi (Opsional)
            </label>
            <textarea
              name="deskripsi"
              placeholder="Ceritakan tentang keluarga Anda..."
              value={formData.deskripsi}
              onChange={handleChange}
              disabled={loading}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Privacy Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tipe Privasi
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="privacy_type"
                  value="private"
                  checked={formData.privacy_type === "private"}
                  onChange={handleChange}
                  disabled={loading}
                  className="mr-2"
                />
                <span className="text-gray-700 text-sm">
                  Pribadi (Hanya Anda)
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="privacy_type"
                  value="public"
                  checked={formData.privacy_type === "public"}
                  onChange={handleChange}
                  disabled={loading}
                  className="mr-2"
                />
                <span className="text-gray-700 text-sm">
                  Publik (Bisa dilihat orang lain)
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Membuat..." : "Buat Keluarga"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFamilyForm;
