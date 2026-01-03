import React, { useState } from "react";
import { ChevronLeft, Edit2 } from "lucide-react";

const DetailPage = ({ member, onBack, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    onEdit && onEdit();
  };

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="text-center">No member data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Detail Page</h1>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
          >
            <ChevronLeft size={20} />
            Kembali
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Profil Pribadi Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Profil Pribadi
            </h2>

            <div className="flex gap-8">
              {/* Left - Photo */}
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-4">
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.nama_depan}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <svg
                      className="w-20 h-20 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <a
                  href="#"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Foto Profil
                </a>
              </div>

              {/* Right - Info */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="font-semibold text-gray-800">Nama</span>
                    <p className="text-gray-700">
                      {member.nama_depan} {member.nama_belakang}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Status</span>
                    <p className="text-gray-700">{member.status || "Lajang"}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">
                      Nama Sapaan
                    </span>
                    <p className="text-gray-700">{member.nama_sapaan || "-"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="font-semibold text-gray-800">
                      Pekerjaan
                    </span>
                    <p className="text-gray-700">{member.pekerjaan || "-"}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">TTL</span>
                    <p className="text-gray-700">
                      {member.tempat_lahir}, {member.tanggal_lahir || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">
                      Status Pernikahan
                    </span>
                    <p className="text-gray-700">
                      {member.status_menikah
                        ? "Sudah Menikah"
                        : "Belum Menikah"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="font-semibold text-gray-800">
                      Tgl Merninahan
                    </span>
                    <p className="text-gray-700">
                      {member.tgl_menikah || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Alamat</span>
                    <p className="text-gray-700">{member.alamat || "-"}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">
                      No. Telepon
                    </span>
                    <p className="text-gray-700">{member.no_telepon || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-8 border-gray-300" />

          {/* Anggota Keluarga Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Anggota Keluarga
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {/* Pasangan */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-700">
                      Pasangan
                    </td>
                    <td className="py-4 px-4">
                      <a href="#" className="text-blue-600 hover:underline">
                        {member.pasangan_1 || "N/A"}
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <a href="#" className="text-blue-600 hover:underline">
                        {member.pasangan_2 || "N/A"}
                      </a>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>

                  {/* Ayah */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-700">
                      Ayah
                    </td>
                    <td className="py-4 px-4">
                      <a href="#" className="text-blue-600 hover:underline">
                        {member.ayah || "N/A"}
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <a href="#" className="text-blue-600 hover:underline">
                        {member.ayah_pasangan || "N/A"}
                      </a>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>

                  {/* Ibu Saudara */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-700">
                      Ibu Saudara
                    </td>
                    <td className="py-4 px-4">
                      <a href="#" className="text-blue-600 hover:underline">
                        {member.ibu || "N/A"}
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <a href="#" className="text-blue-600 hover:underline">
                        {member.ibu_pasangan || "N/A"}
                      </a>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>

                  {/* Anak */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-700">
                      Anak
                    </td>
                    <td className="py-4 px-4">
                      <a href="#" className="text-blue-600 hover:underline">
                        {member.anak_1 || "N/A"}
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <a href="#" className="text-blue-600 hover:underline">
                        {member.anak_2 || "N/A"}
                      </a>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-500 text-sm mt-4">
              klik untuk melihat profil
            </p>
          </div>

          {/* Edit Profil Button */}
          <div className="flex justify-end">
            <button
              onClick={handleEditClick}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Edit2 size={20} />
              Edit Profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
