import { RoleBadge } from './role-badge';
import ProfileImage from '@/components/layouts/profile-image';
import { StatusBadge } from './status-badge';

import { formattedDate, formattedLastLoginDate } from '@/utils/formatted-date';

export const columns = [
  {
    accessor: 'profileImageUrl',
    title: 'Profile',
    render: (record: any) => <ProfileImage profileImageUrl={record.profileImageUrl} />,
  },
  {
    accessor: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    accessor: 'email',
    title: 'Email',
    sortable: true,
  },
  {
    accessor: 'company',
    title: 'Company',
    sortable: true,
    render: (record: any) => (record.company ? record.company : '-'),
  },
  {
    accessor: 'role',
    title: 'Role',
    sortable: true,
    render: (record: any) => <RoleBadge role={record.roleId?.name} />,
  },
  {
    accessor: 'expiredDate',
    title: 'Expired Date',
    sortable: true,
    render: (record: any) => {
      if (record.expiredDate) {
        return formattedDate(record.expiredDate);
      } else {
        return '-';
      }
    },
  },
  {
    accessor: 'lastLogin',
    title: 'Last Login',
    sortable: true,
    render: (record: any) => {
      if (record.lastLogin) {
        return formattedLastLoginDate(record.lastLogin);
      } else {
        return '-';
      }
    },
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
