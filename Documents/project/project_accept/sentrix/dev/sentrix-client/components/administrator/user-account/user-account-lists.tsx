'use client';

import { useQuery } from '@tanstack/react-query';

import { getAllUsers } from '@/server/actions/users/get-all-users';
import { bulkDeleteUsers } from '@/server/actions/users/bulk-delete-user';

import { columns } from './columns';
import { DataTable } from '@/components/data-table';

const UserAccountLists = () => {
  const { data: users } = useQuery({
    queryKey: ['get-all-users'],
    queryFn: async () => {
      const { data } = await getAllUsers();
      return data;
    },
  });

  return (
    <DataTable
      title="User Account"
      description="Changes to your Billing information will take effect starting with scheduled payment and will be reflected on your next invoice."
      data={users}
      columns={columns}
      addButtonText="add user"
      addButtonPath="/dashboard/administrator/user-account/create"
      editPath="/dashboard/administrator/user-account"
      showHeader={false}
      onBulkDelete={async (ids) => bulkDeleteUsers({ userIds: ids })}
      filterConfig={{
        searchableFields: ['name', 'email', 'company', 'phone'],
      }}
      queryKey={['get-all-users']}
    />
  );
};

export default UserAccountLists;
