import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, Plus, X, Heart } from "lucide-react";

/**
 * FamilyTreeNode Component
 * Displays a single person or couple in a family tree with interactive action buttons
 *
 * Props:
 * - member(s): Single person or couple object with foto, nama_depan, status, gender, etc.
 * - generation: Generation number (displays as "Gen n" badge)
 * - type: "single" or "couple"
 * - onEdit: Callback for edit action
 * - onDelete: Callback for delete action
 * - onAddChild: Callback for add child action
 * - onClick: Callback when card is clicked
 */

export default function FamilyTreeNode({
  member,
  couple = null,
  generation = 0,
  type = "single",
  onEdit = () => {},
  onDelete = () => {},
  onAddChild = () => {},
  onClick = () => {},
}) {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  // Get gender icon
  const getGenderIcon = (gender) => {
    if (!gender) return null;
    return gender.toLowerCase() === "m" ||
      gender.toLowerCase() === "pria" ||
      gender.toLowerCase() === "laki-laki"
      ? "♂"
      : "♀";
  };

  // Get photo display
  const getPhotoDisplay = (photo) => {
    if (!photo) return null;
    return photo.startsWith("data:") ? photo : photo;
  };

  // Check if deceased
  const isDeceased = (status) => status === "Meninggal";

  // Single Person Avatar
  const Avatar = ({ person, size = "medium" }) => {
    const sizeClasses = {
      small: "w-12 h-12",
      medium: "w-16 h-16",
      large: "w-24 h-24",
    };

    return (
      <div className="relative inline-block">
        {getPhotoDisplay(person.photo_url) ? (
          <img
            src={getPhotoDisplay(person.photo_url)}
            alt={person.nama_depan}
            className={`${sizeClasses[size]} rounded-full object-cover border-4 border-blue-300 shadow-md`}
          />
        ) : (
          <div
            className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-300 to-blue-500 border-4 border-blue-300 flex items-center justify-center shadow-md`}
          >
            <svg
              className="w-1/2 h-1/2 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}

        {/* Wafat Badge */}
        {isDeceased(person.status || person.status_hidup) && (
          <div className="absolute inset-0 rounded-full border-4 border-gray-400 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-500 bg-white bg-opacity-80 rounded-full w-8 h-8 flex items-center justify-center">
              †
            </span>
          </div>
        )}
      </div>
    );
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return null;
    }
  };

  // ============ SINGLE PERSON LAYOUT ============
  if (type === "single") {
    const isDeceased = (member.status || member.status_hidup) === "Meninggal";

    return (
      <div className="group relative">
        {/* Main Card */}
        <div
          className={`${
            isDeceased
              ? "bg-gray-200 border-2 border-gray-300"
              : "bg-white border-2 border-gray-100"
          } rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 p-3 cursor-pointer relative`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
          onClick={() => navigate(`/member/${member.id}`)}
        >
          {/* Generation Badge - Top Right */}
          <div className="absolute top-2 right-2 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full z-20">
            Gen {generation}
          </div>

          {/* Content Container - Centered */}
          <div
            className={`flex flex-col items-center ${
              isDeceased ? "opacity-70" : ""
            }`}
          >
            {/* Avatar */}
            <div>
              <Avatar person={member} size="medium" />
            </div>

            {/* Name Below Avatar */}
            <h3 className="font-bold text-gray-800 text-xs mt-1 text-center max-w-32 line-clamp-2">
              {member.nama_depan}
              {member.nama_belakang && ` ${member.nama_belakang}`}
            </h3>

            {/* Gender Icon */}
            {member.gender && (
              <p className="text-xs font-bold text-gray-700 mt-0.5">
                {getGenderIcon(member.gender)}
              </p>
            )}

            {/* Birth Date */}
            {member.tanggal_lahir && (
              <p className="text-2xs text-gray-600 mt-0.5">
                📅 {formatDate(member.tanggal_lahir)}
              </p>
            )}

            {/* Meninggal Badge */}
            {isDeceased && (
              <div className="mt-1.5 w-full">
                <span className="block px-2 py-1 bg-red-500 text-white text-xs rounded-full font-semibold text-center">
                  † Meninggal
                </span>
                {member.tanggal_meninggal && (
                  <p className="text-2xs text-gray-600 mt-0.5 text-center">
                    {formatDate(member.tanggal_meninggal)}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons - Visible Below */}
            {showActions && (
              <div className="flex gap-1 mt-2 w-full justify-center flex-wrap">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(member);
                  }}
                  title="Edit"
                  className="w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 flex items-center justify-center text-xs"
                >
                  <Edit2 size={14} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(member);
                  }}
                  title="Hapus"
                  className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 flex items-center justify-center text-xs"
                >
                  <Trash2 size={14} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddChild(member);
                  }}
                  title="Tambah Anak"
                  className="w-7 h-7 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 flex items-center justify-center text-xs"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Sidebar - Left Side (Hidden by default, shown on hover) - HIDDEN */}
        <div className="hidden absolute -left-16 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-0 origin-right">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(member);
            }}
            title="Edit"
            className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-2xl"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(member);
            }}
            title="Hapus"
            className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-2xl"
          >
            <Trash2 size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              // Set mode for adding spouse
              sessionStorage.setItem(
                "addRelationTo",
                JSON.stringify({
                  parentId: member.id,
                  type: "pasangan",
                  generation: member.generation,
                })
              );
              onAddChild(member);
            }}
            title="Tambah Pasangan"
            className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-2xl"
          >
            <Heart size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              // Clear spouse mode, set child mode
              sessionStorage.removeItem("addRelationTo");
              onAddChild(member);
            }}
            title="Tambah Anak"
            className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-2xl"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Expanded Detail Section - Modal */}
        {/* Removed - Navigate to detail page instead */}
      </div>
    );
  }

  // ============ COUPLE LAYOUT ============
  if (type === "couple") {
    return (
      <div className="group relative">
        {/* Main Card - Couple (Horizontal Layout) */}
        <div
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6 relative cursor-pointer"
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
          onClick={() => navigate(`/member/${member.id}`)}
        >
          {/* Generation Badge - Top Right */}
          <div className="absolute top-3 right-3 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full z-20">
            Gen {generation}
          </div>

          {/* Two Avatars Side by Side */}
          <div className="flex justify-center items-center gap-6 mb-2">
            {/* Person 1 */}
            <div className="flex flex-col items-center">
              <Avatar person={member} size="large" />
              <h3 className="font-bold text-gray-800 text-xs mt-2 text-center max-w-28">
                {member.nama_depan}
              </h3>
              {member.gender && (
                <p className="text-base font-bold text-gray-700 mt-1">
                  {getGenderIcon(member.gender)}
                </p>
              )}
            </div>

            {/* Heart Separator */}
            {couple && <div className="text-2xl text-red-500 font-bold">♥</div>}

            {/* Person 2 (Couple) */}
            {couple ? (
              <div className="flex flex-col items-center">
                <Avatar person={couple} size="large" />
                <h3 className="font-bold text-gray-800 text-xs mt-2 text-center max-w-28">
                  {couple.nama_depan && couple.nama_depan.trim()
                    ? couple.nama_depan
                    : "(Belum Ditambahkan)"}
                </h3>
                {couple.gender && (
                  <p className="text-base font-bold text-gray-700 mt-1">
                    {getGenderIcon(couple.gender)}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center shadow-md">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-600 text-xs mt-2 text-center max-w-28">
                  (Pasangan Belum Ditambah)
                </h3>
              </div>
            )}
          </div>
        </div>

        {/* Action Sidebar - Left Side (Edit & Delete) */}
        <div className="absolute -left-16 md:-left-20 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75 origin-right z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(member);
            }}
            title="Edit"
            className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-2xl"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(member);
            }}
            title="Hapus"
            className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-2xl"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Action Sidebar - Right Side (Spouse & Child for couple) */}
        <div className="absolute -right-16 md:-right-20 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75 origin-left z-10">
          {!couple && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Set mode for adding spouse
                sessionStorage.setItem(
                  "addRelationTo",
                  JSON.stringify({
                    parentId: member.id,
                    type: "pasangan",
                    generation: member.generation,
                  })
                );
                onAddChild(member);
              }}
              title="Tambah Pasangan"
              className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-2xl"
            >
              <Heart size={16} />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              // Clear spouse mode, set child mode
              sessionStorage.removeItem("addRelationTo");
              onAddChild(member);
            }}
            title="Tambah Anak"
            className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-2xl"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
