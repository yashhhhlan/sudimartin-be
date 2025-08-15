import Image from 'next/image';

import { formattedDate } from '@/utils/formatted-date';

export const columns = [
  {
    accessor: 'domain',
    title: 'Domain',
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
            src={process.env.NEXT_PUBLIC_BASE_URL + record.logo}
            alt="logo"
            height={32}
            width={32}
            className="rounded-full"
          />
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
    accessor: 'actions',
    title: 'Actions',
  },
];
