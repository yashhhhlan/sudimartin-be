'use client';

import { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';

import IconTopPublicProfiles from '@/components/icon/icon-top-public-profiles';

import { TopPublicProfileData } from '@/types/api';
import Image from 'next/image';

interface TopPublicProfilesProps {
  data?: TopPublicProfileData;
  isPendingTopPublicProfile?: boolean;
}

const TopPublicProfiles = ({ data, isPendingTopPublicProfile }: TopPublicProfilesProps) => {
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data
      .sort((a, b) => {
        if (a.coveragePercentage !== b.coveragePercentage) {
          return b.coveragePercentage - a.coveragePercentage;
        }
        return b.totalCoverage - a.totalCoverage;
      })
      .map((item, index) => ({
        id: index + 1,
        profile: item.accountName,
        source: item.platformName,
        domain: item.domain,
        voice_share: item.coveragePercentageFormatted,
        social_reach: item.totalCoverageFormatted,
        logo: item.logo,
      }));
  }, [data]);

  const paginatedRecords = useMemo(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    return processedData.slice(from, to);
  }, [processedData, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [pageSize, data]);

  if (isPendingTopPublicProfile) {
    return (
      <div className="panel w-2/3" style={{ width: '66.666667% !important' }}>
        <div className="flex gap-2 items-center border-white-light pb-5 dark:border-[#1b2e4b] dark:text-white-light">
          <IconTopPublicProfiles />
          <h5 className="text-base font-semibold">Top Akun</h5>
        </div>

        <div className="animate-pulse">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-48"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="panel w-2/3">
        <div className="flex gap-2 items-center border-white-light pb-5 dark:border-[#1b2e4b] dark:text-white-light">
          <IconTopPublicProfiles />
          <h5 className="text-base font-semibold">Top Akun</h5>
        </div>

        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <p className="text-sm">No Top Akun data found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel w-2/3">
      <div className="flex gap-2 items-center border-white-light pb-5 dark:border-[#1b2e4b] dark:text-white-light">
        <IconTopPublicProfiles />
        <h5 className="text-base font-semibold">Top Akun</h5>
      </div>
      <div className="datatables">
        <DataTable
          noRecordsText="No results match your search query"
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={paginatedRecords}
          columns={[
            { accessor: 'profile', title: 'Profile' },
            {
              accessor: 'source',
              title: 'Source',
              render: (record: any) => {
                const logo = record.logo ? (
                  <Image src={process.env.NEXT_PUBLIC_BASE_URL + record.logo} alt="logo" height={32} width={32} />
                ) : (
                  record.source
                );

                return logo;
              },
            },
            { accessor: 'voice_share', title: 'Voice Share' },
            { accessor: 'social_reach', title: 'Est. Social Reach' },
          ]}
          totalRecords={processedData.length}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
        />
      </div>
    </div>
  );
};

export default TopPublicProfiles;
