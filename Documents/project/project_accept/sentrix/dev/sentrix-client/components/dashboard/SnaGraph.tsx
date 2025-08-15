// src/app/components/map/SnaGraph.tsx

'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';
import { FaPlay, FaPause, FaExclamationCircle, FaDownload } from 'react-icons/fa';

// Impor pustaka unduhan
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Impor autoTable secara eksplisit

// Impor ikon yang Anda minta
import IconFilter from '../../components/icon/icon-filter';
import IconExcel from '../../components/icon/icon-excel';
import IconPdf from '../../components/icon/icon-pdf';

// Pastikan file-file ini sudah ada di lokasi yang benar
import { colorSteps, categoryColorMap } from '@/data/dataMAps/colorSteps';
import { dataMention } from '@/data/dataMAps/data_mention';

// Impor komponen UI baru
import FilterDrawer from './uiGraph/FilterDrawerGraph';
import DetailDrawer from './uiGraph/DetailDrawer';

interface GraphNode {
  id: string;
  name: string;
  category: string;
  year: number;
  month?: number;
  mentionCount: number;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string;
  target: string;
}

type ExtendedForceGraphMethods = ForceGraphMethods<GraphNode, GraphLink> & {
  lastPointerPos?: { x: number; y: number };
};

function getColorByCategory(category: string): string {
  const colorLabel = categoryColorMap[category];
  const colorObj = colorSteps.find((c) => c.label === colorLabel);
  return colorObj?.color ?? '#9ca3af';
}

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

export default function SnaGraph() {
  const fgRef = useRef<ExtendedForceGraphMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
  const [hoverLink, setHoverLink] = useState<GraphLink | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(Object.keys(categoryColorMap));
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isAggregated, setIsAggregated] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2025);

  const dataMinMaxAllMentions = useMemo(() => {
    const mentions = dataMention.map((d) => d.mention_count);
    return {
      min: mentions.length > 0 ? Math.min(...mentions) : 0,
      max: mentions.length > 0 ? Math.max(...mentions) : 0,
    };
  }, []);

  const [mentionRange, setMentionRange] = useState({
    minMention: dataMinMaxAllMentions.min,
    maxMention: dataMinMaxAllMentions.max,
  });

  const handleYearChange = (year: number) => {
    setSelectedYear(year);

    const filteredMentions =
      year === 0
        ? dataMention.map((d) => d.mention_count)
        : dataMention.filter((d) => d.year === year).map((d) => d.mention_count);

    const newMin = filteredMentions.length > 0 ? Math.min(...filteredMentions) : 0;
    const newMax = filteredMentions.length > 0 ? Math.max(...filteredMentions) : 0;

    setMentionRange({
      minMention: newMin,
      maxMention: newMax,
    });
  };

  const handleMentionChange = (newMentions: { minMention: number; maxMention: number }) => {
    setMentionRange(newMentions);
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = Math.max(400, (width / 3) * 2);
        setDimensions({ width, height });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { nodes, links } = useMemo(() => {
    const filteredData = dataMention.filter(
      (data) =>
        (selectedYear === 0 || data.year === selectedYear) &&
        selectedCategories.includes(data.category) &&
        data.mention_count >= mentionRange.minMention &&
        data.mention_count <= mentionRange.maxMention,
    );

    if (filteredData.length === 0) {
      setIsError(true);
      return { nodes: [], links: [] };
    }
    setIsError(false);

    if (isAggregated) {
      const aggregatedNodesMap = filteredData.reduce(
        (acc, current) => {
          const key = current.category;
          if (!acc[key]) {
            acc[key] = {
              id: key,
              name: current.category,
              category: current.category,
              year: selectedYear,
              mentionCount: 0,
            };
          }
          acc[key].mentionCount += current.mention_count;
          return acc;
        },
        {} as { [key: string]: GraphNode },
      );

      const aggregatedNodes = Object.values(aggregatedNodesMap);
      const totalMentions = aggregatedNodes.reduce((sum, node) => sum + node.mentionCount, 0);

      const centralHubNode: GraphNode = {
        id: 'central-hub',
        name: `Total Mentions (${selectedYear === 0 ? 'Semua Tahun' : selectedYear})`,
        category: 'central',
        year: selectedYear,
        mentionCount: totalMentions,
      };

      const finalNodes = [centralHubNode, ...aggregatedNodes];
      const aggregatedLinks: GraphLink[] = aggregatedNodes.map((node) => ({
        source: 'central-hub',
        target: node.id,
      }));

      return { nodes: finalNodes, links: aggregatedLinks };
    } else {
      const detailedNodes: GraphNode[] = filteredData.map((data) => ({
        id: `${data.year}-${data.month}-${data.category}`,
        name: `${data.category} (${data.month}/${data.year})`,
        category: data.category,
        year: data.year,
        month: data.month,
        mentionCount: data.mention_count,
      }));

      const detailedLinks: GraphLink[] = [];
      const nodesByCategory = detailedNodes.reduce(
        (acc, node) => {
          (acc[node.category] = acc[node.category] || []).push(node);
          return acc;
        },
        {} as { [key: string]: GraphNode[] },
      );

      Object.values(nodesByCategory).forEach((categoryNodes) => {
        categoryNodes.sort((a, b) => (a.month ?? 0) - (b.month ?? 0));
        for (let i = 0; i < categoryNodes.length - 1; i++) {
          detailedLinks.push({ source: categoryNodes[i].id, target: categoryNodes[i + 1].id });
        }
      });

      return { nodes: detailedNodes, links: detailedLinks };
    }
  }, [selectedYear, selectedCategories, mentionRange, isAggregated]);

  const toggleAggregate = () => {
    setIsAggregated(!isAggregated);
    setSelectedNode(null);
    setIsDetailDrawerOpen(false);
    if (fgRef.current) {
      fgRef.current.d3ReheatSimulation();
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nodeColor = (node: GraphNode) => {
    if (node.id === 'central-hub') return '#2563eb';
    return getColorByCategory(node.category);
  };

  const linkColor = (link: GraphLink) => {
    if (hoverLink?.source === link.source && hoverLink?.target === link.target) return '#ef4444';
    if (hoverNode && (link.source === hoverNode.id || link.target === hoverNode.id)) return '#f87171';
    if (link.source === 'central-hub' || link.target === 'central-hub') return '#60a5fa';
    return '#d1d5db';
  };

  const nodeSize = (node: GraphNode) => {
    if (node.id === 'central-hub') return 12;
    const mentionScale = node.mentionCount > 0 ? node.mentionCount / (isAggregated ? 50 : 10) : 1;
    return 2 * mentionScale;
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
    setSelectedNode(null);
  };

  const toggleAllCategories = () => {
    if (selectedCategories.length === Object.keys(categoryColorMap).length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(Object.keys(categoryColorMap));
    }
    setSelectedNode(null);
  };

  const renderTooltip = () => {
    if (!hoverNode) return null;
    const pos = fgRef.current?.lastPointerPos ?? { x: 0, y: 0 };
    return (
      <div
        className="absolute pointer-events-none z-50 bg-white bg-opacity-90 backdrop-blur-sm rounded-md p-3 shadow-lg border border-gray-200 text-sm max-w-xs"
        style={{ left: pos.x + 10, top: pos.y + 10 }}
      >
        <strong className="block mb-1 text-lg text-red-600">{hoverNode.name}</strong>
        {hoverNode.id !== 'central-hub' && (
          <>
            <p>
              <strong>Kategori:</strong> {hoverNode.category}
            </p>
            <p>
              <strong>Jumlah Mention:</strong> {hoverNode.mentionCount}
            </p>
          </>
        )}
      </div>
    );
  };

  const handleDownloadCsv = () => {
    const csv = convertArrayToCSV(nodes);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SNA_Graph_Data_${selectedYear === 0 ? 'All' : selectedYear}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsDownloadMenu(false);
  };

  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF({ orientation: 'landscape' });
      doc.text('Social Network Analysis Report', 10, 10);
      const tableData = nodes.map((node) => [node.name, node.category, node.mentionCount]);

      // Menggunakan fungsi autoTable yang diimpor secara eksplisit
      autoTable(doc, {
        head: [['Node Name', 'Category', 'Mention Count']],
        body: tableData,
      });

      doc.save(`SNA_Graph_Report_${selectedYear === 0 ? 'All' : selectedYear}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Maaf, terjadi kesalahan saat mengunduh PDF. Silakan coba lagi.');
    } finally {
      setIsDownloadMenu(false);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg relative flex gap-6"
        style={{ userSelect: 'none' }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-3xl font-extrabold text-gray-900">Social Network Analysis (SNA) Graph</h2>
            <div className="flex gap-4">
              <button
                onClick={toggleAggregate}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
              >
                {isAggregated ? 'Tampilan Detail' : 'Tampilan Agregat'}
              </button>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
              >
                <IconFilter className="w-5 h-5" />
                Filter
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">Visualisasi hubungan antar berita berdasarkan kategori yang sama.</p>
            <div className="flex gap-4">
              <button
                onClick={handlePlayPause}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isPlaying ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsDownloadMenu(!isDownloadMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                >
                  <FaDownload className="w-5 h-5" />
                  Download
                </button>
                {isDownloadMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button
                        onClick={handleDownloadCsv}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <IconExcel className="w-5 h-5 text-green-600" />
                        Excel
                      </button>
                      <button
                        onClick={handleDownloadPdf}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <IconPdf className="w-5 h-5 text-red-600" />
                        PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-md overflow-hidden relative">
            {isError || !isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 bg-opacity-90 z-20">
                <FaExclamationCircle className="w-16 h-16 text-red-500 animate-bounce" />
                <h3 className="text-xl font-bold mt-4 text-gray-800">
                  {isError ? 'Ups, tidak ada data!' : 'Tekan Play untuk memulai!'}
                </h3>
                <p className="text-gray-600">
                  {isError
                    ? 'Coba sesuaikan filter Anda untuk menemukan data yang relevan.'
                    : 'Grafik akan muncul di sini saat Anda menekan tombol Play.'}
                </p>
              </div>
            ) : null}
            <ForceGraph2D<GraphNode, GraphLink>
              ref={fgRef}
              graphData={{ nodes, links }}
              width={dimensions.width}
              height={dimensions.height}
              nodeLabel="name"
              nodeColor={nodeColor}
              nodeCanvasObject={(node: GraphNode, ctx, globalScale) => {
                const label = node.id === 'central-hub' ? 'Total' : node.name;
                const fontSize = 10 / globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;

                const nodeRadius = nodeSize(node);

                ctx.fillStyle = nodeColor(node);
                ctx.beginPath();
                ctx.arc(node.x ?? 0, node.y ?? 0, nodeRadius, 0, 2 * Math.PI);
                ctx.fill();

                if (isAggregated && (hoverNode?.id === node.id || selectedNode?.id === node.id)) {
                  ctx.strokeStyle = '#ef4444';
                  ctx.lineWidth = 2 / globalScale;
                  ctx.beginPath();
                  ctx.arc(node.x ?? 0, node.y ?? 0, nodeRadius + 2 / globalScale, 0, 2 * Math.PI);
                  ctx.stroke();
                }

                const textOffset = nodeRadius + 2 / globalScale;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#111827';
                ctx.fillText(label, (node.x ?? 0) + textOffset, node.y ?? 0);
              }}
              nodeCanvasObjectMode={() => 'after'}
              nodePointerAreaPaint={(node: GraphNode, color, ctx) => {
                const textWidth = ctx.measureText(node.name).width;
                const bckgDimensions = [textWidth, 10].map((n) => n + 10 * 0.2);
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(node.x ?? 0, node.y ?? 0, nodeSize(node), 0, 2 * Math.PI);
                ctx.fill();
                ctx.fillRect(
                  (node.x ?? 0) + nodeSize(node),
                  (node.y ?? 0) - bckgDimensions[1] / 2,
                  bckgDimensions[0],
                  bckgDimensions[1],
                );
              }}
              linkColor={linkColor}
              linkWidth={(link) =>
                hoverLink && String(link.source) === hoverLink.source && String(link.target) === hoverLink.target
                  ? 3
                  : 1
              }
              onNodeHover={(node) => {
                setHoverNode(node as GraphNode);
                setHoverLink(null);
              }}
              onLinkHover={(link) => {
                setHoverLink(link ? { source: String(link.source), target: String(link.target) } : null);
                setHoverNode(null);
              }}
              onNodeClick={(node) => {
                if (isAggregated && node.id !== 'central-hub') {
                  setSelectedNode(node as GraphNode);
                  setIsDetailDrawerOpen(true);
                } else {
                  setSelectedNode(node as GraphNode);
                }
                fgRef.current?.zoom(2, 200);
              }}
              cooldownTicks={50}
              onEngineStop={() => {
                const padding = isAggregated ? 80 : 40;
                fgRef.current?.zoomToFit(padding, 200, (node) => true);
              }}
            />
          </div>
        </div>
      </div>

      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        onToggleAll={toggleAllCategories}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        minMention={mentionRange.minMention}
        maxMention={mentionRange.maxMention}
        onMentionChange={handleMentionChange}
      />

      <DetailDrawer
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        node={selectedNode}
        dataMention={dataMention}
        selectedYear={selectedYear}
      />
    </>
  );
}
