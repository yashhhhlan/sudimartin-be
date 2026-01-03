import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const DualPageDetail = ({ member, familyTree, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(member || {});

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(member);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      {/* Left Side - Tree/Map Visualization */}
      <div className="w-2/3 bg-white overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Family Tree</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-blue-500 rounded">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 hover:bg-blue-500 rounded">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Tree Container */}
        <div className="flex-1 bg-gray-50 overflow-auto p-6">
          {familyTree ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-500">Tree Visualization</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Family relationship diagram
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No tree data available
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Detail Panel */}
      <div className="w-1/3 bg-white border-l shadow-lg flex flex-col">
        {/* Header */}
        <div className="bg-gray-100 border-b p-4 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Dual Page Detail</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 py-3 px-4 font-semibold text-sm transition ${
              activeTab === "info"
                ? "border-b-2 border-blue-600 text-blue-600 bg-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Info
          </button>
          <button
            onClick={() => setActiveTab("relations")}
            className={`flex-1 py-3 px-4 font-semibold text-sm transition ${
              activeTab === "relations"
                ? "border-b-2 border-blue-600 text-blue-600 bg-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Relations
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === "info" && (
            <div className="space-y-4">
              {/* Member Photo */}
              <div className="text-center mb-4">
                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  {member?.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.nama_depan}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">No Photo</span>
                  )}
                </div>
                <h4 className="font-bold text-gray-800">
                  {member?.nama_depan} {member?.nama_belakang}
                </h4>
                <p className="text-sm text-gray-500">
                  {member?.pekerjaan || "No occupation"}
                </p>
              </div>

              {isEditing ? (
                <form className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Nama Depan
                    </label>
                    <input
                      type="text"
                      name="nama_depan"
                      value={editData.nama_depan || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Nama Belakang
                    </label>
                    <input
                      type="text"
                      name="nama_belakang"
                      value={editData.nama_belakang || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      name="tanggal_lahir"
                      value={editData.tanggal_lahir || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={editData.gender || "Pria"}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="Pria">Pria</option>
                      <option value="Wanita">Wanita</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Pekerjaan
                    </label>
                    <input
                      type="text"
                      name="pekerjaan"
                      value={editData.pekerjaan || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Tempat Lahir
                    </label>
                    <input
                      type="text"
                      name="tempat_lahir"
                      value={editData.tempat_lahir || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-gray-600">Gender:</span>
                    <p className="text-gray-800">{member?.gender || "-"}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Tanggal Lahir:
                    </span>
                    <p className="text-gray-800">
                      {member?.tanggal_lahir || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Tempat Lahir:
                    </span>
                    <p className="text-gray-800">
                      {member?.tempat_lahir || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Pekerjaan:
                    </span>
                    <p className="text-gray-800">{member?.pekerjaan || "-"}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "relations" && (
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-xs font-semibold text-gray-600 mb-2">Ayah</p>
                <p className="text-sm text-gray-800">
                  {member?.ayah_nama || "No data"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-xs font-semibold text-gray-600 mb-2">Ibu</p>
                <p className="text-sm text-gray-800">
                  {member?.ibu_nama || "No data"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  Pasangan
                </p>
                <p className="text-sm text-gray-800">
                  {member?.pasangan_nama || "No data"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-xs font-semibold text-gray-600 mb-2">Anak</p>
                <p className="text-sm text-gray-800">
                  {member?.anak_count ? `${member.anak_count} anak` : "No data"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="border-t bg-gray-50 p-4 flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded font-semibold text-sm hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded font-semibold text-sm hover:bg-gray-400 transition"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DualPageDetail;
