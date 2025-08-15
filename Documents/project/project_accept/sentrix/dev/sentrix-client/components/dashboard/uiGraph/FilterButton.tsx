// src/components/ui/FilterDrawer.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { categoryColorMap, colorSteps } from '@/data/dataMAps/colorSteps';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onToggleAll: () => void;
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
}: FilterDrawerProps) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Filter Kategori</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes size={20} />
          </button>
        </div>

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
  );
}
