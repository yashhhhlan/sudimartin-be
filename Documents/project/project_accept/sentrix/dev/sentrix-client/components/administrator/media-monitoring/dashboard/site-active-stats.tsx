'use client';

import { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';

interface SiteData {
  id: number;
  site: string;
  mentions: number;
}

const sampleSiteData: SiteData[] = [
  { id: 1, site: 'instagram.com', mentions: 87 },
  { id: 2, site: 'tiktok.com', mentions: 36 },
  { id: 3, site: 'facebook.com', mentions: 20 },
  { id: 4, site: 'viva.co.id', mentions: 19 },
  { id: 5, site: 'youtube.com', mentions: 15 },
  { id: 6, site: 'x.com', mentions: 8 },
  { id: 7, site: 'alodokter.com', mentions: 4 },
  { id: 8, site: 'gadget.viva.co.id', mentions: 3 },
  { id: 9, site: 'liputan6.com', mentions: 2 },
  { id: 10, site: 'halodoc.com', mentions: 2 },
];

interface SiteActiveStatsProps {
  data?: SiteData[];
  isPending?: boolean;
}

const SiteActiveStats = ({ data = sampleSiteData, isPending }: SiteActiveStatsProps) => {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const paginatedRecords = useMemo(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    return data.slice(from, to);
  }, [data, page]);

  useEffect(() => {
    setPage(1);
  }, [data]);

  if (isPending) {
    return (
      <div className="panel h-[872px]">
        <div className="mb-5">
          <h5 className="text-lg font-semibold dark:text-white-light">Situs Aktif</h5>
        </div>

        <div className="animate-pulse">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-[70%]"></div>
                <div className="h-6 bg-gray-200 rounded w-[30%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="panel">
        <div className="mb-5">
          <h5 className="text-lg font-semibold dark:text-white-light">Situs Aktif</h5>
        </div>

        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <p className="text-sm">No active sites found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel w-full h-full">
      <div className="mb-5">
        <h5 className="text-lg font-semibold dark:text-white-light">Situs Aktif</h5>
      </div>

      <div className="datatables">
        <DataTable
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={paginatedRecords}
          columns={[
            {
              accessor: 'site',
              title: 'Site',
              width: '70%',
              sortable: true,
              ellipsis: true,
              render: (record: SiteData) => {
                return (
                  <div className="truncate lg:max-w-[80px] 2xl:max-w-[180px]" title={record.site}>
                    {record.site}
                  </div>
                );
              },
            },
            {
              accessor: 'mentions',
              title: 'Mentions',
              width: '30%',
              sortable: true,
            },
          ]}
          totalRecords={data.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={setPage}
          paginationSize="xs"
          paginationText={() => ''}
          verticalSpacing="sm"
          horizontalSpacing="md"
        />
      </div>
    </div>
  );
};

export default SiteActiveStats;
