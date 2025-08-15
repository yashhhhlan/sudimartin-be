'use client';

import Image from 'next/image';

import { formattedDate } from '@/utils/formatted-date';

import { StatusBadge } from './status-badge';

export const columns = [
  {
    accessor: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    accessor: 'logo',
    title: 'Logo',
    sortable: true,
    render: (record: any) => {
      return (
        <div className="flex items-center gap-2">
          <Image
            src={process.env.NEXT_PUBLIC_BASE_URL + record?.logo}
            alt="logo"
            height={32}
            width={32}
            className="rounded-full size-8"
          />
        </div>
      );
    },
  },
  {
    accessor: 'mainKeywords',
    title: 'Keywords',
    sortable: true,
    render: (record: any) => {
      const otherMainKeywords = record.mainKeywords.slice(1);
      const totalKeywords = otherMainKeywords.filter((keyword: string) => keyword !== '-').length;

      return (
        <div className="flex items-center gap-2">
          <div className="px-2 py-.5 w-fit border bg-[#00C86E] text-white rounded-md text-xs">
            {record.mainKeywords.slice(0, 1)}
          </div>

          {totalKeywords > 1 && (
            <div className="px-2 py.5 w-fit border bg-[#E0E6ED] rounded-md text-xs">+{totalKeywords}</div>
          )}
        </div>
      );
    },
  },
  {
    accessor: 'createdAt',
    title: 'Created Date',
    sortable: true,
    render: (record: any) => {
      return formattedDate(record.createdAt);
    },
  },
  {
    accessor: 'updatedAt',
    title: 'Modified Date',
    sortable: true,
    render: (record: any) => {
      if (record.updatedAt) {
        return formattedDate(record.updatedAt);
      } else {
        return '-';
      }
    },
  },
  {
    accessor: 'createdBy',
    title: 'Created By',
    sortable: true,
    render: (record: any) => <div>{record?.createdBy?.email}</div>,
  },
  {
    accessor: 'status',
    title: 'Status',
    render: (record: any) => <StatusBadge status={record.status} />,
  },
  {
    accessor: 'actions',
    title: 'Actions',
  },
];
