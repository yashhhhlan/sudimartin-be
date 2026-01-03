import React, { useState, useEffect } from "react";

/**
 * User Form Component
 */
export const UserForm = ({
  initialValues,
  onSubmit,
  loading = false,
  onCancel,
}) => {
  const getDefaultValues = () => {
    // Auto-fill tanggal lahir dengan hari ini
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const todayFormatted = `${day}-${month}-${year}`;

    return {
      namaDepan: "",
      namaBelakang: "",
      gender: "Pria",
      tanggalLahir: todayFormatted,
      tanggalMenikah: "",
      photoUrl: "",
      alamat: "",
      tempatLahir: "",
      pekerjaan: "",
      menikah: false,
    };
  };

  const [formData, setFormData] = useState(
    initialValues?.namaDepan ? initialValues : getDefaultValues()
  );
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(formData.photoUrl || "");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        // Set photoUrl to the data URL or keep empty if you want to handle upload separately
        setFormData((prev) => ({
          ...prev,
          photoUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nama Depan */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nama Depan *
          </label>
          <input
            type="text"
            name="namaDepan"
            value={formData.namaDepan}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="Masukkan nama depan"
          />
        </div>

        {/* Nama Belakang */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nama Belakang
          </label>
          <input
            type="text"
            name="namaBelakang"
            value={formData.namaBelakang}
            onChange={handleChange}
            className="input-field"
            placeholder="Masukkan nama belakang"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Jenis Kelamin
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input-field"
          >
            <option value="Pria">Pria</option>
            <option value="Wanita">Wanita</option>
          </select>
        </div>

        {/* Tanggal Lahir */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Tanggal Lahir (DD-MM-YYYY)
          </label>
          <input
            type="text"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleChange}
            className="input-field"
            placeholder="01-01-1990"
          />
        </div>

        {/* Tempat Lahir */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Tempat Lahir
          </label>
          <input
            type="text"
            name="tempatLahir"
            value={formData.tempatLahir}
            onChange={handleChange}
            className="input-field"
            placeholder="Kota, Provinsi"
          />
        </div>

        {/* Menikah Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="menikah"
            name="menikah"
            checked={formData.menikah}
            onChange={handleChange}
            className="w-4 h-4 text-primary"
          />
          <label
            htmlFor="menikah"
            className="ml-2 text-sm font-semibold text-gray-700"
          >
            Status Menikah
          </label>
        </div>

        {/* Tanggal Menikah - Conditional */}
        {formData.menikah && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tanggal Menikah (DD-MM-YYYY)
            </label>
            <input
              type="text"
              name="tanggalMenikah"
              value={formData.tanggalMenikah}
              onChange={handleChange}
              className="input-field"
              placeholder="15-06-2020"
            />
          </div>
        )}

        {/* Pekerjaan */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Pekerjaan
          </label>
          <input
            type="text"
            name="pekerjaan"
            value={formData.pekerjaan}
            onChange={handleChange}
            className="input-field"
            placeholder="Engineer, Dokter, etc"
          />
        </div>

        {/* Alamat */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Alamat
          </label>
          <textarea
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="input-field resize-none"
            rows="3"
            placeholder="Jln. Contoh No. 123, Jakarta"
          />
        </div>

        {/* Photo URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            URL Foto
          </label>
          <input
            type="url"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            className="input-field"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        {/* Photo Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Upload Foto dari Library
          </label>
          <div className="flex gap-3">
            <input
              type="file"
              id="photoUpload"
              accept="image/*"
              onChange={handlePhotoFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => document.getElementById("photoUpload").click()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Pilih Foto
            </button>
            {photoFile && (
              <span className="text-sm text-gray-600 py-2">
                ✓ {photoFile.name}
              </span>
            )}
          </div>
          {photoPreview && (
            <div className="mt-3">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border border-gray-300"
              />
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 justify-end pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Batal
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Simpan"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
