import { formattedDate } from '@/utils/formatted-date';

export const columns = [
  {
    accessor: 'date',
    title: 'Date',
    sortable: true,
    render: (record: any) => {
      return formattedDate(record.date);
    },
  },
  {
    accessor: 'project.name',
    title: 'Project Name',
    sortable: true,
    render: (record: any) => {
      if (!record?.project) return '-';

      return record.project;
    },
  },
  {
    accessor: 'topic',
    title: 'Topic',
    sortable: true,
  },
  {
    accessor: 'description',
    title: 'Description',
    sortable: true,
  },
  {
    accessor: 'mention',
    title: 'Mention',
    sortable: true,
  },
  {
    accessor: 'reach',
    title: 'Reach',
    sortable: true,
  },
  {
    accessor: 'percentage',
    title: 'Percentage',
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
