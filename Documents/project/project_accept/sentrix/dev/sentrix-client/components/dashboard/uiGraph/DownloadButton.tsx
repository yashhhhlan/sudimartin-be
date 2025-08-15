'use client';

import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

export default function DownloadButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk mengunduh PDF (contoh)
  const handleDownloadPdf = () => {
    alert('Mengunduh file PDF...');
    setIsOpen(false);
  };

  // Fungsi untuk mengunduh CSV (contoh)
  const handleDownloadCsv = () => {
    alert('Mengunduh file CSV...');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors duration-200"
      >
        <FaDownload />
        Unduh
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <button
            onClick={handleDownloadCsv}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Ekspor ke CSV
          </button>
          <button
            onClick={handleDownloadPdf}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Ekspor ke PDF
          </button>
        </div>
      )}
    </div>
  );
}
