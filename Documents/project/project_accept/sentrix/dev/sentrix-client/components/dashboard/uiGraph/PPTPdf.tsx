'use client';

import React from 'react';
// Mengimpor data_mention.js
import { dataMention } from '@/data/dataMAps/data_mention';

function convertArrayToCSV(data: any[]) {
  if (!data.length) return '';

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((fieldName) => {
          const escaped = ('' + row[fieldName]).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(','),
    ),
  ];

  return csvRows.join('\r\n');
}

export default function PPTCsv() {
  const handleDownload = () => {
    // Menggunakan dataMention untuk membuat CSV
    const csv = convertArrayToCSV(dataMention);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    // Mengubah nama file agar lebih relevan
    link.download = 'mention_data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Download CSV
    </button>
  );
}
