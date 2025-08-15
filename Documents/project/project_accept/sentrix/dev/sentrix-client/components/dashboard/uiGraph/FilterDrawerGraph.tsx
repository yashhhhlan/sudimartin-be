// src/components/uiGraph/FilterDrawerGraph.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

// Pastikan file data_mention.ts sudah diperbarui
import { dataMention } from '@/data/dataMAps/data_mention';
import { categoryColorMap, colorSteps } from '@/data/dataMAps/colorSteps';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onToggleAll: () => void;
  selectedYear: number;
  onYearChange: (year: number) => void;
  minMention: number;
  maxMention: number;
  onMentionChange: (mention: { minMention: number; maxMention: number }) => void;
}

function getColor(label: string): string {
  return colorSteps.find((c) => c.label === label)?.color ?? '#9ca3af';
}

export default function FilterDrawer({
  isOpen,
  onClose,
  selectedCategories,
  onToggleCategory,
  onToggleAll,
  selectedYear,
  onYearChange,
  minMention,
  maxMention,
  onMentionChange,
}: FilterDrawerProps) {
  // Mengambil tahun dan rentang mention secara dinamis dari data
  const years = useMemo(() => {
    const allYears = dataMention.map((d) => d.year);
    // Tambahkan 0 untuk opsi "Total" dan urutkan secara ascending
    return [0, ...Array.from(new Set(allYears)).sort((a, b) => a - b)];
  }, []);

  const dataMinMaxMention = useMemo(() => {
    // Jika tahun yang dipilih adalah 0, ambil data dari semua tahun
    const mentions =
      selectedYear === 0
        ? dataMention.map((d) => d.mention_count)
        : dataMention.filter((d) => d.year === selectedYear).map((d) => d.mention_count);

    if (mentions.length === 0) {
      return { min: 0, max: 0 };
    }
    return {
      min: Math.min(...mentions),
      max: Math.max(...mentions),
    };
  }, [selectedYear]);

  // State lokal untuk slider, disinkronkan dengan props
  const [localMinMention, setLocalMinMention] = useState(minMention);
  const [localMaxMention, setLocalMaxMention] = useState(maxMention);

  // Sinkronisasi state lokal dengan props
  useEffect(() => {
    setLocalMinMention(minMention);
    setLocalMaxMention(maxMention);
  }, [minMention, maxMention]);

  // Reset slider ketika tahun berubah
  useEffect(() => {
    setLocalMinMention(dataMinMaxMention.min);
    setLocalMaxMention(dataMinMaxMention.max);
    onMentionChange({ minMention: dataMinMaxMention.min, maxMention: dataMinMaxMention.max });
  }, [selectedYear, dataMinMaxMention.min, dataMinMaxMention.max]);

  // Handler untuk slider
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const id = e.target.id;

    if (id === 'min-slider') {
      const newMin = Math.min(value, localMaxMention);
      setLocalMinMention(newMin);
      onMentionChange({ minMention: newMin, maxMention: localMaxMention });
    } else if (id === 'max-slider') {
      const newMax = Math.max(value, localMinMention);
      setLocalMaxMention(newMax);
      onMentionChange({ minMention: localMinMention, maxMention: newMax });
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Filter</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <FaTimes size={20} />
            </button>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Tahun</h4>
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === 0 ? 'Total (Semua Tahun)' : year}
                </option>
              ))}
            </select>
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Jumlah Mention</h4>
            <p className="text-sm text-gray-500 mb-4">
              Geser slider untuk memfilter node berdasarkan jumlah mention. Rentang nilai akan otomatis menyesuaikan
              dengan data tahun yang Anda pilih, memastikan hasil yang **akurat dan relevan**.
            </p>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{localMinMention}</span>
              <span>{localMaxMention}</span>
            </div>
            <div className="relative">
              <input
                id="min-slider"
                type="range"
                min={dataMinMaxMention.min}
                max={dataMinMaxMention.max}
                value={localMinMention}
                onChange={handleSliderChange}
                className="w-full h-1 bg-red-100 rounded-lg appearance-none cursor-pointer"
              />
              <input
                id="max-slider"
                type="range"
                min={dataMinMaxMention.min}
                max={dataMinMaxMention.max}
                value={localMaxMention}
                onChange={handleSliderChange}
                className="w-full h-1 bg-red-100 rounded-lg appearance-none cursor-pointer absolute top-0"
              />
              {/* Overlay untuk visualisasi range yang dipilih */}
              <div
                className="absolute top-0 h-1 bg-red-500 rounded-lg"
                style={{
                  left: `${((localMinMention - dataMinMaxMention.min) / (dataMinMaxMention.max - dataMinMaxMention.min)) * 100}%`,
                  width: `${((localMaxMention - localMinMention) / (dataMinMaxMention.max - dataMinMaxMention.min)) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          <h4 className="text-lg font-semibold mb-2">Kategori</h4>
          <div className="mb-4">
            <button
              onClick={onToggleAll}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
            >
              {selectedCategories.length === Object.keys(categoryColorMap).length
                ? 'Nonaktifkan Semua'
                : 'Aktifkan Semua'}
            </button>
          </div>

          <div className="space-y-4">
            {Object.entries(categoryColorMap).map(([category, colorLabel]) => {
              const isSelected = selectedCategories.includes(category);
              const hexColor = getColor(colorLabel);
              return (
                <div
                  key={category}
                  onClick={() => onToggleCategory(category)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border ${
                    isSelected ? 'border-gray-700' : 'border-gray-300'
                  }`}
                  style={{
                    backgroundColor: isSelected ? hexColor + '20' : 'transparent',
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-sm border"
                    style={{
                      backgroundColor: hexColor,
                      borderColor: isSelected ? '#b91c1c' : 'transparent',
                    }}
                  />
                  <span className={`font-semibold ${isSelected ? 'text-gray-900' : 'text-gray-500'}`}>{category}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
