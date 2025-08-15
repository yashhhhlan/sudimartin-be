'use client';

import { newsData, NewsItem as NewsItemType } from '@/data/dataMAps/newsData';
import { colorData } from '@/data/dataMAps/colorData';
import { useMemo, useState, useEffect } from 'react';

export interface NewsItem extends NewsItemType {}

interface FilterDrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;

  selectedCity: string;
  setSelectedCity: (city: string, lng?: number, lat?: number, zoomDelta?: number) => void;

  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  showColor: boolean;
  setShowColor: (show: boolean) => void;

  activeColors: string[];
  toggleColor: (colorLabel: string) => void;

  filteredNews: NewsItem[];

  onNewsClick: (news: NewsItem) => void;

  mapZoom: number;
  defaultZoom: number;
  resetMap: () => void;
}

export default function FilterDrawer({
  drawerOpen,
  setDrawerOpen,
  selectedCity,
  setSelectedCity,
  selectedCategory,
  setSelectedCategory,
  showColor,
  setShowColor,
  activeColors,
  toggleColor,
  filteredNews,
  onNewsClick,
  mapZoom,
  defaultZoom,
  resetMap,
}: FilterDrawerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const cityDataWithCoords = useMemo(() => {
    const data: Record<string, { lng: number; lat: number }> = {};
    newsData.forEach((news) => {
      if (!data[news.city]) {
        data[news.city] = { lng: news.lng, lat: news.lat };
      }
    });
    return data;
  }, []);

  const cityOptions = ['All', ...Array.from(new Set(newsData.map((n) => n.city)))];
  const categoryOptions = ['All', ...Array.from(new Set(newsData.map((n) => n.category)))];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalMentionsPerColor = useMemo(() => {
    return colorData.reduce(
      (acc, step) => {
        const total = filteredNews
          .filter((news) => news.mentions >= step.minMentions && news.mentions <= step.maxMentions)
          .reduce((sum, news) => sum + news.mentions, 0);
        acc[step.label] = total;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [filteredNews]);

  const currentNews = useMemo(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    return filteredNews.slice(firstItemIndex, lastItemIndex);
  }, [filteredNews, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredNews]);

  return (
    <div
      id="filter-drawer"
      className={`fixed right-0 z-50 h-full w-full sm:w-80 md:w-96 lg:w-72 bg-white text-gray-800 shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ease-out 
      ${drawerOpen ? 'translate-x-0' : 'translate-x-full'} 
      top-0 sm:top-16`}
    >
      {/* Header Drawer */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h2 className="text-lg font-bold text-blue-800 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 7a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 7a1 1 0 011-1h7a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
            />
          </svg>
          <span className="text-sm md:text-lg">Filter & Berita</span>
        </h2>
        <div className="flex items-center gap-3">
          {mapZoom !== defaultZoom && (
            <button
              onClick={resetMap}
              className="flex items-center p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
              title="Reset Map"
            >
              <span className="ml-1 text-sm font-semibold hidden md:inline">Reset Map</span>
            </button>
          )}
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-gray-500 hover:text-gray-900 text-2xl leading-none"
          >
            &times;
          </button>
        </div>
      </div>

      {/* Konten Drawer */}
      <div className="p-6 overflow-y-auto h-[calc(100%-60px)] space-y-6 text-sm">
        {/* Filter Kota */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <label htmlFor="city-select" className="block mb-2 font-semibold text-blue-700">
            Kota
          </label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => {
              const city = e.target.value;
              const coords = cityDataWithCoords[city];
              if (coords) {
                setSelectedCity(city, coords.lng, coords.lat, 0);
              } else {
                setSelectedCity(city);
              }
            }}
            className="w-full rounded-md border border-blue-300 p-2 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Kategori */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <label htmlFor="category-select" className="block mb-2 font-semibold text-green-700">
            Kategori
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-md border border-green-300 p-2 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Warna */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <label className="flex items-center space-x-2 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={showColor}
              onChange={(e) => setShowColor(e.target.checked)}
              className="h-5 w-5 text-yellow-500 border-gray-300"
            />
            <span className="text-gray-800 font-semibold">Tampilkan warna</span>
          </label>
          <div className="space-y-2">
            {colorData.map(({ label, color, minMentions, maxMentions }) => (
              <label
                key={label}
                className={`flex items-center space-x-3 p-2 rounded-lg ${
                  !showColor ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-100'
                } ${activeColors.includes(label) ? 'bg-gray-100' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={activeColors.includes(label)}
                  onChange={() => toggleColor(label)}
                  disabled={!showColor}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <span
                  className="inline-block h-5 w-5 rounded-full border-2 border-gray-400"
                  style={{ backgroundColor: color }}
                />
                <span className="flex-grow text-gray-700 capitalize">
                  {label} ({minMentions} - {maxMentions})
                  <span className="block text-xs text-gray-500">Total: {totalMentionsPerColor[label] || 0}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Daftar Berita */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Berita Sesuai Terkini</h3>
          <div className="space-y-4">
            {currentNews.length === 0 ? (
              <p className="text-gray-500 italic text-center">Tidak ada berita ditemukan.</p>
            ) : (
              currentNews.map((news) => (
                <div
                  key={news.id}
                  className="group cursor-pointer rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200"
                  onClick={() => {
                    onNewsClick(news);
                    setDrawerOpen(false);
                  }}
                >
                  {news.imageUrl && (
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-28 object-cover group-hover:scale-110 transition-transform"
                    />
                  )}
                  <div className="p-4">
                    <strong className="block text-gray-900 text-base font-semibold group-hover:text-blue-600">
                      {news.title}
                    </strong>
                    <div className="text-xs text-gray-600">
                      {news.city} • {news.category}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{news.date ? formatDate(news.date) : '-'}</div>
                    <div className="text-xs text-gray-500">{news.mentions} Mentions</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
