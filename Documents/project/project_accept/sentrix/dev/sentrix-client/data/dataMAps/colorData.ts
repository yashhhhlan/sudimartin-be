// src/data/dataMAps/colorData.ts

export const colorData = [
  { label: 'merah', color: '#f87171', minMentions: 0, maxMentions: 100 },
  { label: 'biru', color: '#60a5fa', minMentions: 101, maxMentions: 200 },
  { label: 'hijau', color: '#4ade80', minMentions: 201, maxMentions: 300 },
  { label: 'kuning', color: '#facc15', minMentions: 301, maxMentions: 400 },
  { label: 'ungu', color: '#c084fc', minMentions: 401, maxMentions: 500 },
];

export const categoryColorMapGL: { [key: string]: string } = {
  Politik: 'merah',
  Ekonomi: 'biru',
  Olahraga: 'hijau',
  Budaya: 'kuning',
  Pendidikan: 'hijau',
  Teknologi: 'biru',
};
