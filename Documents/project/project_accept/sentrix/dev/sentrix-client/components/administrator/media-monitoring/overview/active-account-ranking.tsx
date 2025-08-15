'use client';

import { useState } from 'react';

import IconDownload from '@/components/icon/icon-download';
import PercentageBar from './percentage-bar';
import Pagination from '@/components/pagination';

const sampleActiveAccounts = [
  { id: 1, rank: 1, name: 'Trump', description: 'Sedangkan', value: 25, maxValue: 30 },
  { id: 2, rank: 2, name: 'Donald John Trump', description: 'Presiden Amerika Serikat', value: 21, maxValue: 30 },
  { id: 3, rank: 3, name: 'Perry Warjiyo', description: 'Gubernur Bank Indonesia', value: 17, maxValue: 30 },
  {
    id: 4,
    rank: 4,
    name: 'Prabowo Subianto DI..',
    description: 'Presiden Republik Indonesia ke-8',
    value: 16,
    maxValue: 30,
  },
  { id: 5, rank: 5, name: 'Josua Pardede', description: 'Kepala Bank Ekonomi Permata', value: 8, maxValue: 30 },
  {
    id: 6,
    rank: 6,
    name: 'Sri Mulyani Indrawati',
    description: 'Menteri Keuangan Republik Indonesia',
    value: 6,
    maxValue: 30,
  },
  {
    id: 7,
    rank: 7,
    name: 'Airlangga Hartarto',
    description: 'Menteri Koordinator Bidang Pere..',
    value: 5,
    maxValue: 30,
  },
  { id: 8, rank: 8, name: 'Bahlil Lahadalia', description: 'Menteri Energi Sumber daya', value: 4, maxValue: 30 },
  { id: 9, rank: 9, name: 'Kiryanto', description: 'Komisaris Independen', value: 4, maxValue: 30 },
  { id: 10, rank: 10, name: 'M. Ashidiq Iswara', description: 'Corporate Secretary', value: 4, maxValue: 30 },
];

const sampleActiveSites = [
  { id: 1, rank: 1, name: 'detik.com', description: 'Portal berita terpopuler', value: 85, maxValue: 100 },
  { id: 2, rank: 2, name: 'kompas.com', description: 'Media informasi terpercaya', value: 78, maxValue: 100 },
  { id: 3, rank: 3, name: 'tribunnews.com', description: 'Jaringan media digital', value: 65, maxValue: 100 },
  { id: 4, rank: 4, name: 'okezone.com', description: 'Portal berita dan lifestyle', value: 58, maxValue: 100 },
  { id: 5, rank: 5, name: 'liputan6.com', description: 'Media berita online', value: 45, maxValue: 100 },
  { id: 6, rank: 6, name: 'tempo.co', description: 'Media berita independen', value: 42, maxValue: 100 },
  { id: 7, rank: 7, name: 'antaranews.com', description: 'Kantor berita nasional', value: 38, maxValue: 100 },
  { id: 8, rank: 8, name: 'cnnindonesia.com', description: 'Portal berita internasional', value: 35, maxValue: 100 },
];

type TabType = 'active-accounts' | 'active-sites';

interface TabData {
  id: TabType;
  label: string;
  data: typeof sampleActiveAccounts;
}

const tabsData: TabData[] = [
  {
    id: 'active-accounts',
    label: 'Akun Aktif',
    data: sampleActiveAccounts,
  },
  {
    id: 'active-sites',
    label: 'Situs Aktif',
    data: sampleActiveSites,
  },
];

const ActiveAccountRanking = () => {
  const [activeTab, setActiveTab] = useState<TabType>('active-accounts');
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
            className={`w-full py-3 font-medium text-sm transition-colors duration-200 first:rounded-l-lg last:rounded-r-lg ${
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
              <div className="flex 2xl:gap-4 lg:gap-2 w-full">
                <span className="2xl:text-xl lg:text-base w-6">{item.rank}</span>
                <div className="flex flex-col">
                  <span className="2xl:text-xl lg:text-base font-normal">{item.name}</span>
                  <span className="text-[#888EA8] 2xl:text-base lg:text-sm">{item.description}</span>
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

export default ActiveAccountRanking;
