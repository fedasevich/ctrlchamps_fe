import { Stack } from '@mui/material';
import Head from 'next/head';

import AdminMenu from 'src/components/admin-menu/AdminMenu';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import TasksManagement from 'src/components/admin-management/tasks/TasksManagement';

export default function TasksManagementPage(): JSX.Element {
  const { translate } = useLocales();

  return (
    <PrivateRoute allowedRoles={[USER_ROLE.SuperAdmin, USER_ROLE.Admin]}>
      <Head>
        <title>{translate('adminManagement.title')}</title>
      </Head>
      <Stack direction="row">
        <AdminMenu />
        <TasksManagement />
      </Stack>
    </PrivateRoute>
  );
}
