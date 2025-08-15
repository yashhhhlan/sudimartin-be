'use client';

import { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';

import IconMostInfluentialSite from '@/components/icon/icon-most-influential-site';
import { MostInfluentialSitesData } from '@/types/api';

interface MostInfluentialSitesDataTableProps {
  data?: MostInfluentialSitesData;
  isPendingMostInfluentialSites: boolean;
}

const MostInfluentialSitesDataTable = ({ data, isPendingMostInfluentialSites }: MostInfluentialSitesDataTableProps) => {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.map((item, index) => ({
      id: index + 1,
      site: item.sites,
      visit: item.visitFormatted,
      influencer_score: item.score,
    }));
  }, [data]);

  const paginatedRecords = useMemo(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    return processedData.slice(from, to);
  }, [processedData, page]);

  useEffect(() => {
    setPage(1);
  }, [data]);

  if (isPendingMostInfluentialSites) {
    return (
      <div className="panel w-1/3">
        <div className="flex gap-2 items-center border-white-light pb-5 dark:border-[#1b2e4b] dark:text-white-light">
          <IconMostInfluentialSite />
          <h5 className="text-base font-semibold">Top Situs</h5>
        </div>

        <div className="animate-pulse">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="panel w-1/3">
        <div className="flex gap-2 items-center border-white-light pb-5 dark:border-[#1b2e4b] dark:text-white-light">
          <IconMostInfluentialSite />
          <h5 className="text-base font-semibold">Top Situs</h5>
        </div>

        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <p className="text-sm">No influential sites data found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel w-1/3">
      <div className="flex gap-2 items-center border-white-light pb-5 dark:border-[#1b2e4b] dark:text-white-light">
        <IconMostInfluentialSite />
        <h5 className="text-base font-semibold">Top Situs</h5>
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
              sortable: true,
            },
            {
              accessor: 'visit',
              title: 'Visits',
              sortable: true,
            },
            {
              accessor: 'influencer_score',
              title: 'Influence Score',
              sortable: true,
            },
          ]}
          totalRecords={processedData.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={setPage}
          paginationSize="sm"
          paginationText={() => ''}
          verticalSpacing="sm"
          horizontalSpacing="md"
        />
      </div>
    </div>
  );
};

export default MostInfluentialSitesDataTable;
