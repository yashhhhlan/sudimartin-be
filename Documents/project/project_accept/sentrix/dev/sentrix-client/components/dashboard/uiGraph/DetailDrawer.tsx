// src/app/components/map/uiGraph/DetailDrawer.tsx

import React, { useState, useEffect } from 'react';
import { FaTimes, FaCalendarAlt, FaSortNumericDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Tipe data untuk mention
interface MentionData {
  year: number;
  month: number;
  category: string;
  mention_count: number;
}

interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  node: any;
  dataMention: MentionData[];
  selectedYear: number;
}

/**
 * DetailDrawer component for displaying detailed information about an aggregated node.
 * It now includes dynamic year and month filters, a responsive, professional design,
 * and icon-based pagination for the monthly data list.
 */
export default function DetailDrawer({ isOpen, onClose, node, dataMention, selectedYear }: DetailDrawerProps) {
  if (!node) return null;

  // State to handle year and month selection within the drawer. 0 means all years/months.
  const [localSelectedYear, setLocalSelectedYear] = useState<number>(selectedYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  // State untuk paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Effect hook to reset local state when the drawer is opened or parent's year changes.
  // Ini memastikan filter bulan dan halaman diatur ulang saat Anda membuka detail node baru.
  useEffect(() => {
    if (isOpen) {
      setLocalSelectedYear(selectedYear);
      setSelectedMonth(0);
      setCurrentPage(1); // Reset halaman ke 1 saat drawer dibuka
    }
  }, [isOpen, selectedYear]);

  // Filter the data based on the selected node's category, and the year/month selected within the drawer.
  const filteredData = dataMention.filter(
    (d) =>
      d.category === node.category &&
      (localSelectedYear === 0 || d.year === localSelectedYear) &&
      (selectedMonth === 0 || d.month === selectedMonth),
  );

  const totalMentionsForYear = dataMention
    .filter((d) => d.category === node.category && (localSelectedYear === 0 || d.year === localSelectedYear))
    .reduce((sum, d) => sum + d.mention_count, 0);

  // Hitung data untuk halaman saat ini
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Tentukan teks tampilan untuk tahun.
  const yearText = localSelectedYear === 0 ? 'Semua Tahun' : localSelectedYear.toString();

  // Buat daftar semua tahun dan bulan unik yang tersedia untuk kategori node.
  const availableYears = Array.from(new Set(dataMention.map((d) => d.year))).sort((a, b) => a - b);
  const monthNames = [
    'Semua Bulan',
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const monthText = monthNames[selectedMonth] || 'Semua Bulan';

  return (
    <>
      {/* Drawer Backdrop: Creates a semi-transparent overlay that closes the drawer when clicked. */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        />
      )}
      {/* Main Drawer Container: Now responsive with a wider max-width on larger screens. */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 md:w-1/3 max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header section with title and close button */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Detail Kategori</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
              <FaTimes size={24} />
            </button>
          </div>

          {/* Content section */}
          <div className="flex-grow overflow-y-auto pt-4 space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
              <h4 className="text-lg font-bold text-red-600">{node.name}</h4>
              <p className="text-sm text-gray-700 mt-2">
                Jumlah Total Mention:{' '}
                <strong className="text-xl font-extrabold text-black">{totalMentionsForYear}</strong>{' '}
                <span className="text-gray-500 font-normal">({yearText})</span>
              </p>
            </div>

            {/* Filter controls section */}
            <div className="p-4 bg-white rounded-xl shadow-md space-y-4">
              <h5 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" /> Filter Data
              </h5>
              <div className="flex flex-col space-y-3">
                <label className="text-sm font-medium text-gray-700">Pilih Tahun:</label>
                <select
                  value={localSelectedYear}
                  onChange={(e) => setLocalSelectedYear(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value={0}>Semua Tahun</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-3">
                <label className="text-sm font-medium text-gray-700">Pilih Bulan:</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {monthNames.map((name, index) => (
                    <option key={index} value={index}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Display filtered monthly breakdown */}
            <div className="p-4 bg-white rounded-xl shadow-md">
              <h5 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                <FaSortNumericDown className="text-green-500" /> Hasil Filter
              </h5>
              <p className="text-sm text-gray-600 mt-2">
                Menampilkan data untuk: <span className="font-bold text-blue-600">{monthText}</span>
              </p>

              {filteredData.length > 0 ? (
                <>
                  <ul className="space-y-3 mt-4">
                    {paginatedData.map((d, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <span className="font-medium text-gray-700">Bulan {d.month}</span>
                        <span className="font-bold text-gray-900">{d.mention_count}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Paginasi menggunakan ikon */}
                  {filteredData.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-center items-center gap-4 mt-6">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-3 rounded-lg text-gray-700 bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                        aria-label="Previous Page"
                      >
                        <FaChevronLeft size={16} />
                      </button>
                      <span className="font-semibold text-gray-700">
                        {currentPage} / {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-3 rounded-lg text-gray-700 bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                        aria-label="Next Page"
                      >
                        <FaChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-500 mt-4">Tidak ada data untuk kombinasi filter ini.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
