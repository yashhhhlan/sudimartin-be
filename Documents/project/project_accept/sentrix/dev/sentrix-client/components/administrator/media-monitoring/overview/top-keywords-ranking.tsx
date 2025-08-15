'use client';

import { useState } from 'react';

import IconDownload from '@/components/icon/icon-download';
import PercentageBar from './percentage-bar';
import Pagination from '@/components/pagination';

const sampleKeywords = [
  { id: 1, rank: 1, name: 'Suku Bunga Acuan BI', value: 87, maxValue: 100 },
  { id: 2, rank: 2, name: 'Inflasi', value: 46, maxValue: 100 },
  { id: 3, rank: 3, name: 'Kurs Rupiah', value: 26, maxValue: 100 },
  { id: 4, rank: 4, name: 'Strategi operasi moneter', value: 24, maxValue: 100 },
  { id: 5, rank: 5, name: 'Pendalaman Pasar Keuangan', value: 22, maxValue: 100 },
  { id: 6, rank: 6, name: 'G20', value: 20, maxValue: 100 },
  { id: 7, rank: 7, name: 'Pertumbuhan Ekonomi', value: 15, maxValue: 100 },
  { id: 8, rank: 8, name: 'Utang Luar Negeri', value: 14, maxValue: 100 },
  { id: 9, rank: 9, name: 'Makroprudensial', value: 14, maxValue: 100 },
  { id: 10, rank: 10, name: 'KSSK & PLJP', value: 13, maxValue: 100 },
  { id: 11, rank: 11, name: 'Kebijakan Fiskal', value: 12, maxValue: 100 },
  { id: 12, rank: 12, name: 'Sistem Pembayaran', value: 11, maxValue: 100 },
  { id: 13, rank: 13, name: 'Financial Technology', value: 10, maxValue: 100 },
  { id: 14, rank: 14, name: 'Stabilitas Sistem Keuangan', value: 9, maxValue: 100 },
  { id: 15, rank: 15, name: 'Cadangan Devisa', value: 8, maxValue: 100 },
];

const sampleHashtags = [
  { id: 1, rank: 1, name: '#InflasiIndonesia', value: 92, maxValue: 100 },
  { id: 2, rank: 2, name: '#SukuBungaBI', value: 78, maxValue: 100 },
  { id: 3, rank: 3, name: '#KursRupiah', value: 65, maxValue: 100 },
  { id: 4, rank: 4, name: '#BankIndonesia', value: 52, maxValue: 100 },
  { id: 5, rank: 5, name: '#EkonomiNasional', value: 48, maxValue: 100 },
  { id: 6, rank: 6, name: '#G20Indonesia', value: 45, maxValue: 100 },
  { id: 7, rank: 7, name: '#PertumbuhanEkonomi', value: 42, maxValue: 100 },
  { id: 8, rank: 8, name: '#UtangLuarNegeri', value: 38, maxValue: 100 },
  { id: 9, rank: 9, name: '#Makroprudensial', value: 35, maxValue: 100 },
  { id: 10, rank: 10, name: '#KSSK', value: 32, maxValue: 100 },
  { id: 11, rank: 11, name: '#KeuanganInklusi', value: 28, maxValue: 100 },
  { id: 12, rank: 12, name: '#DigitalBanking', value: 25, maxValue: 100 },
];

type TabType = 'keywords' | 'hashtags';

interface TabData {
  id: TabType;
  label: string;
  data: typeof sampleKeywords;
}

const tabsData: TabData[] = [
  {
    id: 'keywords',
    label: 'Top Keyword',
    data: sampleKeywords,
  },
  {
    id: 'hashtags',
    label: 'Top Hashtag',
    data: sampleHashtags,
  },
];

const TopKeywordsRanking = () => {
  const [activeTab, setActiveTab] = useState<TabType>('keywords');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const currentTabData = tabsData.find((tab) => tab.id === activeTab);
  const data = currentTabData?.data || [];

  const totalItems = data.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentPageData = data.slice(startIndex, endIndex);

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  return (
    <div className="w-1/2 panel h-full">
      <div className="flex border-b border-gray-200 w-full">
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`w-full py-3 font-medium text-sm transition-colors duration-200 first:rounded-l-lg ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                : 'bg-gray-100 text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          {currentPageData.map((item) => (
            <div className="flex items-start" key={item.id}>
              <div className="flex 2xl:gap-4 w-full">
                <span className="2xl:text-xl lg:text-base w-6">{item.rank}</span>
                <div className="flex flex-col">
                  <span className="2xl:text-xl lg:text-base font-normal">{item.name}</span>
                </div>
              </div>

              <div className="flex items-center w-full gap-6">
                <div className="flex-1 w-full">
                  <PercentageBar value={item.value} maxValue={item.maxValue} />
                </div>
                <span className="2xl:text-lg lg:text-base font-semibold">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <IconDownload />
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopKeywordsRanking;
