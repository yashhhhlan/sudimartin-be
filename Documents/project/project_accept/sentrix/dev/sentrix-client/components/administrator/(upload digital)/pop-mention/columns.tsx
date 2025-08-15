import { formattedDate } from '@/utils/formatted-date';

export const columns = [
  {
    accessor: 'date',
    title: 'Date',
    sortable: true,
  },
  {
    accessor: 'project',
    title: 'Project Name',
    sortable: true,
  },
  {
    accessor: 'totalRecord',
    title: 'Total Record',
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
];
