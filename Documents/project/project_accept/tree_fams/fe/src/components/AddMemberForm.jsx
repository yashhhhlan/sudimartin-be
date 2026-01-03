import React, { useState } from "react";
import { useWorkspace } from "../context/WorkspaceContext";
import { useAuth } from "../contexts/AuthContext";
import { X } from "lucide-react";

const AddMemberForm = ({
  familyId,
  editingMember = null,
  parentForChild = null,
  onClose,
  onMemberAdded,
}) => {
  const { currentFamily, members } = useWorkspace();
  const { token } = useAuth();

  // Get relationData from sessionStorage at the top level
  const addRelationTo = sessionStorage.getItem("addRelationTo");
  const relationData = addRelationTo ? JSON.parse(addRelationTo) : null;

  // Initialize form data based on editing or adding child
  const getInitialFormData = () => {
    if (editingMember) {
      return {
        ...editingMember,
        tanggal_wafat: editingMember.tanggal_meninggal || "",
        status_hidup: editingMember.status || editingMember.status_hidup,
      };
    }

    const baseData = {
      nama_depan: "",
      nama_belakang: "",
      nama_sapaan: "",
      gender: "Pria",
      tanggal_lahir: "",
      tempat_lahir: "",
      tanggal_wafat: "",
      pekerjaan: "",
      alamat: "",
      photo_url: "",
      nama_display: "nama_depan",
      status_hidup: "Hidup",
      status_menikah: relationData?.type === "pasangan" ? "Menikah" : "Single",
      hubungan_keluarga:
        relationData?.type === "pasangan"
          ? "Pasangan"
          : parentForChild
          ? "Anak"
          : "Pilih",
      generation:
        relationData?.type === "pasangan"
          ? relationData.generation.toString()
          : parentForChild
          ? (parentForChild.generation + 1).toString()
          : "1",
    };

    return baseData;
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("File harus berupa gambar (JPG, PNG, dll)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Ukuran file terlalu besar (max 5MB)");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo_url: reader.result,
        }));
        setPhotoPreview(reader.result);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validasi Nama Depan (Required)
    if (!formData.nama_depan || !formData.nama_depan.trim()) {
      errors.nama_depan = "Nama depan harus diisi";
    }

    // Validasi Gender (Required)
    if (!formData.gender || formData.gender === "") {
      errors.gender = "Jenis kelamin harus dipilih";
    }

    // Validasi Status Hidup (Required)
    if (!formData.status_hidup) {
      errors.status_hidup = "Status (Hidup/Meninggal) harus dipilih";
    }

    // Validasi Tanggal Lahir jika diisi (format check)
    if (formData.tanggal_lahir && !isValidDate(formData.tanggal_lahir)) {
      errors.tanggal_lahir = "Format tanggal tidak valid";
    }

    // Validasi Tanggal Meninggal jika diisi
    if (formData.tanggal_wafat && !isValidDate(formData.tanggal_wafat)) {
      errors.tanggal_wafat = "Format tanggal tidak valid";
    }

    // Validasi Hubungan Keluarga jika tidak dalam mode pasangan
    if (
      !editingMember &&
      formData.hubungan_keluarga &&
      formData.hubungan_keluarga === "Pilih"
    ) {
      errors.hubungan_keluarga = "Hubungan keluarga harus dipilih";
    }

    return errors;
  };

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  const getFieldLabel = (fieldName) => {
    const labels = {
      nama_depan: "Nama Depan",
      nama_belakang: "Nama Belakang",
      gender: "Jenis Kelamin",
      status_hidup: "Status Hidup",
      tanggal_lahir: "Tanggal Lahir",
      tanggal_wafat: "Tanggal Meninggal",
      hubungan_keluarga: "Hubungan Keluarga",
      photo_url: "Foto",
    };
    return labels[fieldName] || fieldName;
  };

  const getInputClass = (fieldName) => {
    const baseClass =
      "w-full px-4 py-2 border rounded text-sm focus:outline-none transition";
    if (fieldErrors[fieldName]) {
      return `${baseClass} border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200`;
    }
    return `${baseClass} border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`;
  };

  const getSelectClass = (fieldName) => {
    const baseClass =
      "w-full px-4 py-2 border rounded text-sm focus:outline-none transition bg-white";
    if (fieldErrors[fieldName]) {
      return `${baseClass} border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200`;
    }
    return `${baseClass} border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Validasi form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstErrorKey = Object.keys(errors)[0];
      setError(
        `⚠️ Terdapat ${
          Object.keys(errors).length
        } field yang belum diisi atau tidak valid:`
      );
      // Scroll ke field pertama yang error
      const firstErrorField = document.querySelector(
        `[name="${firstErrorKey}"]`
      );
      if (firstErrorField) {
        firstErrorField.focus();
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        nama_depan: formData.nama_depan,
        nama_belakang: formData.nama_belakang,
        nama_sapaan: formData.nama_sapaan,
        gender: formData.gender,
        tanggal_lahir: formData.tanggal_lahir,
        tempat_lahir: formData.tempat_lahir,
        tanggal_wafat: formData.tanggal_wafat || null,
        pekerjaan: formData.pekerjaan,
        photo_url: formData.photo_url,
        nama_display: formData.nama_display,
        status_hidup: formData.status_hidup,
        status_menikah: formData.status_menikah,
        hubungan_keluarga: formData.hubungan_keluarga,
        generation: parseInt(formData.generation) || 1,
      };

      // If adding child, set parent ID based on gender
      if (parentForChild) {
        if (parentForChild.gender === "Pria" || parentForChild.gender === "m") {
          payload.ayah_id = parentForChild.id;
        } else {
          payload.ibu_id = parentForChild.id;
        }
      }

      const response = await fetch(
        `http://localhost:5200/api/families/${
          familyId || currentFamily.id
        }/members${editingMember ? `/${editingMember.id}` : ""}`,
        {
          method: editingMember ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend error response:", data);
        throw new Error(data.message || "Gagal menambah anggota keluarga");
      }

      // If adding spouse, update parent's status_menikah to "Menikah"
      if (isSpouseMode && relationData) {
        try {
          const parentUpdateResponse = await fetch(
            `http://localhost:5200/api/families/${
              familyId || currentFamily.id
            }/members/${relationData.parentId}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status_menikah: "Menikah",
              }),
            }
          );

          if (!parentUpdateResponse.ok) {
            console.warn("Failed to update parent's status_menikah");
          }
        } catch (err) {
          console.warn("Error updating parent status:", err);
        }
      }

      onMemberAdded();
      onClose();
    } catch (err) {
      setError(err.message);
      console.error("Error adding member:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const isSpouseMode = !!relationData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {editingMember
                ? "Edit Anggota Keluarga"
                : parentForChild
                ? `Tambah Anak: ${parentForChild.nama_depan}`
                : isSpouseMode
                ? `Tambah Pasangan`
                : "Tambah Anggota Keluarga"}
            </h2>
            {isSpouseMode && (
              <p className="text-sm text-blue-600 mt-1 font-semibold">
                ℹ️ Form otomatis dikonfigurasi untuk pasangan
              </p>
            )}
          </div>
          <button
            onClick={() => {
              onClose();
              sessionStorage.removeItem("addRelationTo");
            }}
            disabled={submitting}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-800">
              <p className="font-semibold mb-2">{error}</p>
              {Object.keys(fieldErrors).length > 0 && (
                <ul className="list-disc list-inside text-sm space-y-1">
                  {Object.entries(fieldErrors).map(([field, message]) => (
                    <li key={field}>
                      <strong>{getFieldLabel(field)}:</strong> {message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {isSpouseMode ? (
            // ========== SIMPLIFIED SPOUSE FORM ==========
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900">
                  <strong>Mode Pasangan:</strong> Data yang diperlukan hanya
                  nama dan gender. Data lainnya sudah otomatis terisi sesuai
                  konfigurasi.
                </p>
              </div>

              <div className="space-y-4">
                {/* Photo Section */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-32 h-32 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-2 overflow-hidden">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
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
                    <label
                      htmlFor="photo-upload"
                      className="text-blue-600 font-semibold text-xs hover:underline cursor-pointer"
                    >
                      {photoPreview ? "Ganti" : "Unggah"}
                    </label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      disabled={submitting}
                      className="hidden"
                    />
                  </div>

                  {/* Essential Fields Only */}
                  <div className="flex-1 space-y-3">
                    {/* Nama Lengkap - REQUIRED */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nama_depan"
                        placeholder="Masukkan nama lengkap pasangan"
                        value={formData.nama_depan}
                        onChange={handleChange}
                        disabled={submitting}
                        className={getInputClass("nama_depan")}
                        autoFocus
                      />
                      {fieldErrors.nama_depan && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          ✕ {fieldErrors.nama_depan}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        disabled={submitting}
                        className={getSelectClass("gender")}
                      >
                        <option value="">-- Pilih --</option>
                        <option value="Pria">Pria</option>
                        <option value="Wanita">Wanita</option>
                      </select>
                      {fieldErrors.gender && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          ✕ {fieldErrors.gender}
                        </p>
                      )}
                    </div>

                    {/* Status Hidup */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status Hidup <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`flex gap-4 p-2 rounded border ${
                          fieldErrors.status_hidup
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                      >
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="status_hidup"
                            value="Hidup"
                            checked={formData.status_hidup === "Hidup"}
                            onChange={handleChange}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Hidup</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="status_hidup"
                            value="Meninggal"
                            checked={formData.status_hidup === "Meninggal"}
                            onChange={handleChange}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Meninggal</span>
                        </label>
                      </div>
                      {fieldErrors.status_hidup && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          ✕ {fieldErrors.status_hidup}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Optional Additional Info */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-3">
                    📝 Informasi Tambahan (Opsional)
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="nama_sapaan"
                      placeholder="Nama Sapaan"
                      value={formData.nama_sapaan}
                      onChange={handleChange}
                      disabled={submitting}
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      name="pekerjaan"
                      placeholder="Pekerjaan"
                      value={formData.pekerjaan}
                      onChange={handleChange}
                      disabled={submitting}
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="date"
                      name="tanggal_lahir"
                      value={formData.tanggal_lahir}
                      onChange={handleChange}
                      disabled={submitting}
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      name="tempat_lahir"
                      placeholder="Tempat Lahir"
                      value={formData.tempat_lahir}
                      onChange={handleChange}
                      disabled={submitting}
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Auto-configured Info */}
                <div className="pt-3 text-xs text-gray-500 italic bg-gray-50 p-3 rounded">
                  <p className="font-semibold text-gray-700 mb-2">
                    ✓ Otomatis Dikonfigurasi:
                  </p>
                  ✓ Status Pernikahan: <strong>Menikah</strong>
                  <br />✓ Hubungan Keluarga: <strong>Pasangan</strong>
                  <br />✓ Generasi: <strong>Sesuai pasangan</strong>
                </div>
              </div>
            </>
          ) : (
            // ========== REGULAR FORM (CHILD/EDIT) ==========
            <>
              <div className="flex gap-8 mb-8">
                {/* Left - Photo Section */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-40 h-40 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-3 overflow-hidden">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-20 h-20 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                      </svg>
                    )}
                  </div>
                  <label
                    htmlFor="photo-upload"
                    className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer"
                  >
                    {photoPreview ? "Ganti Foto" : "Unggah Foto"}
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    disabled={submitting}
                    className="hidden"
                  />
                </div>

                {/* Right - Form Fields */}
                <div className="flex-1 space-y-3">
                  <div>
                    <input
                      type="text"
                      name="nama_depan"
                      placeholder="Nama Lengkap"
                      value={formData.nama_depan}
                      onChange={handleChange}
                      disabled={submitting}
                      className={getInputClass("nama_depan")}
                    />
                    {fieldErrors.nama_depan && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        ✕ {fieldErrors.nama_depan}
                      </p>
                    )}
                  </div>

                  <input
                    type="text"
                    name="nama_sapaan"
                    placeholder="Nama Sapaan"
                    value={formData.nama_sapaan}
                    onChange={handleChange}
                    disabled={submitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                  />

                  <input
                    type="text"
                    name="pekerjaan"
                    placeholder="Pekerjaan"
                    value={formData.pekerjaan}
                    onChange={handleChange}
                    disabled={submitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <hr className="my-6 border-gray-300" />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tampilkan Nama
                  </label>
                  <select
                    name="nama_display"
                    value={formData.nama_display}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="nama_depan">Nama Lengkap</option>
                    <option value="nama_sapaan">Nama Sapaan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`flex gap-4 items-center mt-2 p-2 rounded border ${
                      fieldErrors.status_hidup
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status_hidup"
                        value="Hidup"
                        checked={formData.status_hidup === "Hidup"}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Hidup</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status_hidup"
                        value="Meninggal"
                        checked={formData.status_hidup === "Meninggal"}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Meninggal</span>
                    </label>
                  </div>
                  {fieldErrors.status_hidup && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      ✕ {fieldErrors.status_hidup}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hubungan Keluarga
                </label>
                <select
                  name="hubungan_keluarga"
                  value={formData.hubungan_keluarga}
                  onChange={handleChange}
                  disabled={submitting}
                  className={getSelectClass("hubungan_keluarga")}
                >
                  <option value="Pilih">Pilih</option>
                  <option value="Ayah">Ayah</option>
                  <option value="Ibu">Ibu</option>
                  <option value="Anak">Anak</option>
                  <option value="Pasangan">Pasangan</option>
                  <option value="Saudara">Saudara</option>
                </select>
                {fieldErrors.hubungan_keluarga && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    ✕ {fieldErrors.hubungan_keluarga}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Generasi
                </label>
                <select
                  name="generation"
                  value={formData.generation}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((gen) => (
                    <option key={gen} value={gen}>
                      Generasi {gen}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Pria"
                      checked={formData.gender === "Pria"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Pria</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Wanita"
                      checked={formData.gender === "Wanita"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Wanita</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tempat Lahir
                </label>
                <input
                  type="text"
                  name="tempat_lahir"
                  placeholder="Tempat Lahir"
                  value={formData.tempat_lahir}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {formData.status_hidup === "Meninggal" && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal Meninggal
                  </label>
                  <input
                    type="date"
                    name="tanggal_wafat"
                    value={formData.tanggal_wafat}
                    onChange={handleChange}
                    disabled={submitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status Pernikahan
                </label>
                <select
                  name="status_menikah"
                  value={formData.status_menikah}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="Single">Single</option>
                  <option value="Menikah">Menikah</option>
                </select>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                onClose();
                sessionStorage.removeItem("addRelationTo");
              }}
              disabled={submitting}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {submitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;
