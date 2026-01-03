import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, Plus, Heart } from "lucide-react";
import FamilyMemberAvatar from "./FamilyMemberAvatar";

/**
 * ProFamilyTreeCard Component
 * Kartu optimized untuk diagram silsilah keluarga dengan support multi-spouse
 *
 * Props:
 * - member: Primary member object
 * - spouses: Array of spouse objects [{id, nama_depan, ...}]
 * - generation: Generation number
 * - onEdit: Callback untuk edit
 * - onDelete: Callback untuk delete
 * - onAddSpouse: Callback untuk tambah pasangan
 * - onAddChild: Callback untuk tambah anak
 */
export default function ProFamilyTreeCard({
  member,
  spouses = [],
  generation = 0,
  onEdit = () => {},
  onDelete = () => {},
  onAddSpouse = () => {},
  onAddChild = () => {},
}) {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  if (!member) return null;

  const isDeceased =
    member?.status_hidup === "Meninggal" || member?.status === "Meninggal";
  const isMale =
    member.gender?.toLowerCase() === "m" ||
    member.gender?.toLowerCase() === "pria" ||
    member.gender?.toLowerCase() === "laki-laki";

  // Handle card click to navigate to detail page
  const handleCardClick = () => {
    navigate(`/member/${member.id}`);
  };

  return (
    <div className="group relative">
      {/* Main Card Container */}
      <div
        className={`relative rounded-2xl shadow-lg transition-all duration-300 ease-in-out p-4 md:p-5 cursor-pointer
          ${
            isDeceased
              ? "bg-gray-100 border-2 border-gray-400"
              : "bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl"
          }
        `}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onClick={handleCardClick}
      >
        {/* Generation Badge - Top Right Corner */}
        <div className="absolute top-3 right-3 bg-gradient-to-br from-blue-400 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
          Gen {generation}
        </div>

        {/* Multi-Spouse Layout Logic */}
        {spouses.length === 0 ? (
          // SINGLE LAYOUT
          <div
            className={`flex flex-col items-center ${
              isDeceased ? "opacity-70" : ""
            } pointer-events-none`}
          >
            <FamilyMemberAvatar member={member} size="large" />

            {/* Name */}
            <h3 className="font-bold text-gray-800 text-sm mt-3 text-center max-w-[150px] line-clamp-2">
              {member.nama_depan}
              {member.nama_belakang && ` ${member.nama_belakang}`}
            </h3>

            {/* Birth Date */}
            {member.tanggal_lahir && (
              <p className="text-xs text-gray-600 mt-1">
                📅{" "}
                {new Date(member.tanggal_lahir).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}

            {/* Wafat Info */}
            {isDeceased && (
              <div className="mt-2 w-full">
                <span className="block px-2 py-1 bg-red-500 text-white text-xs rounded-full font-semibold text-center w-fit mx-auto">
                  † Meninggal
                </span>
                {member.tanggal_meninggal && (
                  <p className="text-xs text-gray-600 mt-1 text-center">
                    {new Date(member.tanggal_meninggal).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : spouses.length === 1 ? (
          // COUPLE LAYOUT (1 Spouse)
          <div
            className={`flex items-center justify-center gap-2 md:gap-3 ${
              isDeceased ? "opacity-70" : ""
            }`}
          >
            <div className="flex flex-col items-center">
              <FamilyMemberAvatar member={member} size="large" />
              <h3 className="font-bold text-gray-800 text-xs mt-2 text-center max-w-[120px] line-clamp-2">
                {member.nama_depan}
              </h3>
            </div>

            {/* Heart Separator */}
            <div className="text-2xl text-red-400 font-bold">♥</div>

            {/* Spouse */}
            <div className="flex flex-col items-center">
              <FamilyMemberAvatar member={spouses[0]} size="large" />
              <h3 className="font-bold text-gray-800 text-xs mt-2 text-center max-w-[120px] line-clamp-2">
                {spouses[0].nama_depan}
              </h3>
            </div>
          </div>
        ) : (
          // MULTI-SPOUSE LAYOUT: [Istri 1] ♥ [Suami] ♥ [Istri 2] ♥ [Istri 3]
          <div
            className={`flex items-center justify-center gap-1 md:gap-1.5 flex-wrap px-2 ${
              isDeceased ? "opacity-70" : ""
            }`}
          >
            {/* Render wives BEFORE husband */}
            {spouses
              .slice(0, Math.floor(spouses.length / 2))
              .map((spouse, idx) => (
                <div
                  key={`spouse-before-${idx}`}
                  className="flex items-center gap-1 md:gap-1.5"
                >
                  <div
                    className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/member/${spouse.id}`);
                    }}
                  >
                    <FamilyMemberAvatar member={spouse} size="small" />
                    <h3 className="font-bold text-gray-700 text-2xs mt-0.5 text-center max-w-[80px] line-clamp-1 pointer-events-none">
                      {spouse.nama_depan}
                    </h3>
                    <span className="text-xs text-pink-500 font-semibold mt-0.5 bg-pink-100 px-1.5 py-0.5 rounded-full pointer-events-none">
                      Istri {idx + 1}
                    </span>
                  </div>
                  <div className="text-lg text-red-400 font-bold pointer-events-none">
                    ♥
                  </div>
                </div>
              ))}

            {/* Main member (husband) in the middle */}
            <div className="flex flex-col items-center pointer-events-none">
              <FamilyMemberAvatar member={member} size="small" />
              <h3 className="font-bold text-gray-800 text-2xs mt-0.5 text-center max-w-[80px] line-clamp-1 pointer-events-none">
                {member.nama_depan}
              </h3>
            </div>

            {/* Render wives AFTER husband */}
            {spouses
              .slice(Math.floor(spouses.length / 2))
              .map((spouse, idx) => {
                const actualIdx = Math.floor(spouses.length / 2) + idx + 1;
                return (
                  <div
                    key={`spouse-after-${idx}`}
                    className="flex items-center gap-1 md:gap-1.5"
                  >
                    <div className="text-lg text-red-400 font-bold pointer-events-none">
                      ♥
                    </div>
                    <div
                      className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/member/${spouse.id}`);
                      }}
                    >
                      <FamilyMemberAvatar member={spouse} size="small" />
                      <h3 className="font-bold text-gray-700 text-2xs mt-0.5 text-center max-w-[80px] line-clamp-1 pointer-events-none">
                        {spouse.nama_depan}
                      </h3>
                      <span className="text-xs text-pink-500 font-semibold mt-0.5 bg-pink-100 px-1.5 py-0.5 rounded-full pointer-events-none">
                        Istri {actualIdx}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* Action Buttons - Visible Below Card on Hover */}
        {showActions && (
          <div className="flex gap-2 mt-4 justify-center flex-wrap opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(member);
              }}
              title="Edit"
              className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center text-xs"
            >
              <Edit2 size={16} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(member);
              }}
              title="Hapus"
              className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center text-xs"
            >
              <Trash2 size={16} />
            </button>

            {/* Add Spouse Button - for all males */}
            {isMale && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddSpouse(member);
                }}
                title="Tambah Pasangan"
                className="w-8 h-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center text-xs"
              >
                <Heart size={16} />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddChild(member);
              }}
              title="Tambah Anak"
              className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center text-xs"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>

      {/* LEFT SIDE ACTION SIDEBAR - Floating Vertical Buttons */}
      <div
        className={`absolute -left-14 md:-left-16 top-1/2 -translate-y-1/2 flex flex-col gap-2 transition-all duration-300 ease-in-out z-20
          ${
            showActions
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2 pointer-events-none"
          }
        `}
      >
        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(member);
          }}
          title="Edit"
          className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-2xl"
        >
          <Edit2 size={18} />
        </button>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(member);
          }}
          title="Hapus"
          className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-2xl"
        >
          <Trash2 size={18} />
        </button>

        {/* Add Spouse Button - for all males */}
        {isMale && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddSpouse(member);
            }}
            title="Tambah Pasangan"
            className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-2xl"
          >
            <Heart size={18} />
          </button>
        )}

        {/* Add Child Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddChild(member);
          }}
          title="Tambah Anak"
          className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-2xl"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
