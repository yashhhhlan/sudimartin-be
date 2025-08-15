'use client';

import ReactWordcloud from 'react-wordcloud';

import IconDiscussion from '@/components/icon/icon-discussion';
import { WordcloudData } from '@/types/api';

// Sample data based on the reference image
const sampleWordcloudData: WordcloudData = [
  { text: 'inflasi', value: 100 },
  { text: 'sinergi', value: 80 },
  { text: 'daerah', value: 75 },
  { text: 'kepala', value: 70 },
  { text: 'pemerintah', value: 65 },
  { text: 'provinsi', value: 60 },
  { text: 'hasil', value: 55 },
  { text: 'perintah', value: 50 },
  { text: 'ekonomi', value: 45 },
  { text: 'digitalisasi', value: 40 },
  { text: 'laksana', value: 38 },
  { text: 'efektif', value: 35 },
  { text: 'konsistensi', value: 33 },
  { text: 'primante', value: 30 },
  { text: 'tenggara', value: 28 },
  { text: 'sulawesi', value: 25 },
  { text: 'kendali', value: 23 },
  { text: 'kolaborasi', value: 20 },
  { text: 'gubernur', value: 18 },
  { text: 'produktivitas', value: 15 },
  { text: 'strategi', value: 13 },
  { text: 'nasional', value: 12 },
  { text: 'program', value: 10 },
  { text: 'kuat', value: 8 },
  { text: 'stabilitas', value: 7 },
  { text: 'pengendalian', value: 6 },
  { text: 'komunikasi', value: 5 },
  { text: 'ketersediaan', value: 4 },
  { text: 'distribusi', value: 3 },
  { text: 'optimalisasi', value: 2 },
];

interface ContextDiscussionProps {
  data?: WordcloudData;
  isPendingWordcloudMention?: boolean;
}

const ContextDiscussion = ({ data = sampleWordcloudData, isPendingWordcloudMention }: ContextDiscussionProps) => {
  const options = {
    fontSizes: [18, 60] as [number, number],
    rotations: 2,
    rotationAngles: [-30, 0] as [number, number],
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'],
    fontFamily: 'Inter, sans-serif',
    enableTooltip: true,
    deterministic: true,
    padding: 2,
  };

  return (
    <div className="panel p-0 lg:col-span-2 w-1/2 text-base 2xl:h-[584px] lg:h-[520px]">
      <div className="mb-5 flex gap-2 items-center border-white-light p-5">
        <IconDiscussion />
        <h5 className="text-base font-semibold">Konteks Diskusi</h5>
      </div>

      <div className="relative 2xl:h-[480px] lg:h-[440px] flex items-center justify-center">
        {isPendingWordcloudMention ? (
          <span className="text-sm text-gray-400 animate-pulse">Loading Wordcloud...</span>
        ) : !data || data.length === 0 ? (
          <span className="text-sm text-gray-500 text-center">No wordcloud found</span>
        ) : (
          <ReactWordcloud words={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default ContextDiscussion;
