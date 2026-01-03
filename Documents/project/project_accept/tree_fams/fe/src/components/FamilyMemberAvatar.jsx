import React from "react";

/**
 * FamilyMemberAvatar Component
 * Displays avatar untuk anggota keluarga dengan status wafat
 */
export default function FamilyMemberAvatar({
  member,
  size = "medium",
  onClick = () => {},
}) {
  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-16 h-16",
    large: "w-20 h-20",
    xlarge: "w-24 h-24",
  };

  const borderSizeClasses = {
    small: "border-2",
    medium: "border-3",
    large: "border-4",
    xlarge: "border-4",
  };

  const iconSizeClasses = {
    small: "w-1/2 h-1/2",
    medium: "w-1/2 h-1/2",
    large: "w-1/3 h-1/3",
    xlarge: "w-2/5 h-2/5",
  };

  const isDeceased =
    member?.status_hidup === "Meninggal" || member?.status === "Meninggal";
  const getPhotoDisplay = (photo) =>
    photo?.startsWith("data:") ? photo : photo;

  return (
    <div
      className="relative inline-block group cursor-pointer"
      onClick={onClick}
    >
      {/* Avatar Container */}
      {getPhotoDisplay(member?.photo_url) ? (
        <img
          src={getPhotoDisplay(member.photo_url)}
          alt={member?.nama_depan || "Member"}
          className={`${sizeClasses[size]} ${
            borderSizeClasses[size]
          } rounded-full object-cover border-blue-400 shadow-lg transition-all duration-300 group-hover:scale-110 ${
            isDeceased ? "opacity-60 grayscale" : ""
          }`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} ${
            borderSizeClasses[size]
          } rounded-full bg-gradient-to-br from-blue-300 to-blue-500 border-blue-400 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
            isDeceased ? "opacity-60 grayscale" : ""
          }`}
        >
          <svg
            className={`${iconSizeClasses[size]} text-white`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      )}

      {/* Wafat Badge */}
      {isDeceased && (
        <div className="absolute inset-0 rounded-full border-0 flex items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-red-500 bg-white bg-opacity-90 rounded-full w-7 h-7 flex items-center justify-center shadow-md">
            †
          </span>
        </div>
      )}

      {/* Gender Badge */}
      {member?.gender && (
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-blue-400 shadow-md">
          <span className="text-xs font-bold">
            {member.gender.toLowerCase() === "m" ||
            member.gender.toLowerCase() === "pria" ||
            member.gender.toLowerCase() === "laki-laki"
              ? "♂"
              : "♀"}
          </span>
        </div>
      )}
    </div>
  );
}
