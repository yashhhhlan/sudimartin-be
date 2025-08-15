'use client';

import React from 'react';
import jsPDF from 'jspdf';
// jspdf-autotable diperlukan jika Anda ingin menggunakan fitur tabel
import 'jspdf-autotable';
// Mengimpor data_mention.js
import { dataMention } from '@/data/dataMAps/data_mention';

export default function PPTPdf() {
  const handleDownloadPdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    doc.setFontSize(20);
    doc.setTextColor('#b91c1c');
    doc.text('Mention Data Report', 40, 50);

    let y = 80;
    const pageHeight = 800;

    dataMention.forEach((item, index) => {
      // Cek page break
      if (y > pageHeight) {
        doc.addPage();
        y = 50;
      }

      // Menyesuaikan teks dengan properti dataMention
      doc.setFontSize(14);
      doc.setTextColor('#111827');
      doc.text(`${index + 1}. Kategori: ${item.category}`, 40, y);

      doc.setFontSize(12);
      doc.setTextColor('#6b7280');
      doc.text(`Jumlah Mention: ${item.mention_count}`, 40, y + 15);
      doc.text(`Periode: ${item.month}/${item.year}`, 40, y + 30);

      y += 60;
    });

    // opsional: menggunakan autoTable untuk data yang terstruktur
    // Anda bisa mengganti loop di atas dengan ini jika diinginkan:
    /*
    (doc as any).autoTable({
      head: [['Category', 'Mention Count', 'Year', 'Month']],
      body: dataMention.map(item => [item.category, item.mention_count, item.year, item.month]),
      startY: 80,
    });
    */

    doc.save('mention_data.pdf');
  };

  return (
    <button
      onClick={handleDownloadPdf}
      className="ml-4 px-5 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 font-semibold"
    >
      Download PDF
    </button>
  );
}
