import React from "react";
import { useWorkspace } from "../context/WorkspaceContext";

const TooltipPreview = ({ memberId }) => {
  const { getMemberById } = useWorkspace();
  const member = getMemberById(memberId);

  if (!member) return null;

  return (
    <div
      className="fixed bg-white shadow-xl rounded-lg p-4 max-w-xs pointer-events-none z-40"
      style={{
        left: "20px",
        top: "100px",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.nama_depan}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-sm font-bold text-indigo-700">
              {member.nama_depan[0]}
              {member.nama_belakang?.[0] || ""}
            </span>
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-bold text-gray-800">
            {member.nama_depan} {member.nama_belakang || ""}
          </h3>
          <p className="text-xs text-gray-500">
            Generation {member.generation}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mb-2">
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
            member.status === "ALIVE"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {member.status === "ALIVE" ? "Masih Hidup" : "Meninggal"}
        </span>
      </div>

      {/* Info */}
      {member.pekerjaan && (
        <p className="text-sm text-gray-700 mb-1">
          <strong>Pekerjaan:</strong> {member.pekerjaan}
        </p>
      )}

      {member.contact_phone && (
        <p className="text-sm text-gray-700 mb-1">
          <strong>Telepon:</strong> {member.contact_phone}
        </p>
      )}

      {member.contact_email && (
        <p className="text-sm text-gray-700 mb-1">
          <strong>Email:</strong> {member.contact_email}
        </p>
      )}

      {member.biography && (
        <p className="text-xs text-gray-600 line-clamp-2 mt-2">
          {member.biography}
        </p>
      )}
    </div>
  );
};

export default TooltipPreview;
