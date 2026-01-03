import React from "react";
import { getGenderIcon, getGenerasiLabel } from "../utils/helpers";

/**
 * User Card Component - Untuk tampilan di homepage
 */
export const UserCard = ({ user, onClick }) => {
  const {
    id,
    namaDepan,
    namaBelakang,
    gender,
    wafat,
    photoUrl,
    generasi,
    umur,
  } = user;

  return (
    <div
      onClick={onClick}
      className={`card cursor-pointer max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all ${
        wafat ? "grayscale opacity-75" : ""
      }`}
    >
      <div className="relative">
        {/* Photo */}
        <div className="w-full h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={namaDepan}
              className={`w-full h-full object-cover ${
                wafat ? "grayscale" : ""
              }`}
            />
          ) : (
            <span className="text-6xl">{getGenderIcon(gender)}</span>
          )}
        </div>

        {/* Wafat Badge */}
        {wafat && (
          <div className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
            Wafat
          </div>
        )}

        {/* Generasi Badge */}
        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {getGenerasiLabel(generasi)}
        </div>
      </div>

      <div className="p-4">
        {/* Name */}
        <h3 className="text-lg font-bold text-dark truncate">
          {namaDepan} {namaBelakang}
        </h3>

        {/* Meta Info */}
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p>
            <span className="text-xl">{getGenderIcon(gender)}</span> {gender}
          </p>
          {umur && (
            <p>
              Umur: <span className="font-semibold">{umur} tahun</span>
            </p>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <button className="w-full btn btn-primary text-sm">
          Lihat Detail →
        </button>
      </div>
    </div>
  );
};

/**
 * Couple Card - Menampilkan pasangan
 */
export const CoupleCard = ({ user, partner, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`card cursor-pointer max-w-lg bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all ${
        user.wafat || partner.wafat ? "grayscale opacity-75" : ""
      }`}
    >
      <div className="flex">
        {/* Person 1 */}
        <div
          className={`w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 p-4 flex flex-col items-center justify-center text-white text-center relative ${
            user.wafat ? "grayscale opacity-90" : ""
          }`}
        >
          {user.wafat && (
            <div className="absolute top-1 right-1 bg-gray-700 text-white px-1.5 py-0.5 rounded text-[9px] font-semibold">
              Wafat
            </div>
          )}
          <span className="text-4xl mb-2">{getGenderIcon(user.gender)}</span>
          <h4 className="font-bold truncate">{user.namaDepan}</h4>
          <p className="text-xs opacity-90">{user.namaBelakang}</p>
          {user.umur && <p className="text-xs mt-1">{user.umur} tahun</p>}
        </div>

        {/* Divider & Heart */}
        <div className="w-0 relative flex items-center justify-center">
          <div className="absolute -left-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl shadow-lg">
            💕
          </div>
        </div>

        {/* Person 2 */}
        <div
          className={`w-1/2 bg-gradient-to-br from-pink-400 to-pink-600 p-4 flex flex-col items-center justify-center text-white text-center relative ${
            partner.wafat ? "grayscale opacity-90" : ""
          }`}
        >
          {partner.wafat && (
            <div className="absolute top-1 right-1 bg-gray-700 text-white px-1.5 py-0.5 rounded text-[9px] font-semibold">
              Wafat
            </div>
          )}
          <span className="text-4xl mb-2">{getGenderIcon(partner.gender)}</span>
          <h4 className="font-bold truncate">{partner.namaDepan}</h4>
          <p className="text-xs opacity-90">{partner.namaBelakang}</p>
          {partner.umur && <p className="text-xs mt-1">{partner.umur} tahun</p>}
        </div>
      </div>

      <div className="p-3 text-center">
        <button className="w-full btn btn-primary text-sm">
          Lihat Detail →
        </button>
      </div>
    </div>
  );
};

export default UserCard;
