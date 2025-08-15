import Image from 'next/image';

import { formattedDate } from '@/utils/formatted-date';

export const columns = [
  {
    accessor: 'metric',
    title: 'Metric',
    sortable: true,
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
