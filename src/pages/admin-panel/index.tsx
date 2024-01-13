import { Stack } from '@mui/material';
import Head from 'next/head';

import AdminMenu from 'src/components/admin-menu/AdminMenu';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import UserList from 'src/components/user-list/UserList';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';

export default function AdminPanelPage(): JSX.Element | null {
  const { translate } = useLocales();

  return (
    <PrivateRoute allowedRoles={[USER_ROLE.Admin, USER_ROLE.SuperAdmin]}>
      <Head>
        <title>{translate('userList.title')}</title>
      </Head>
      <Stack direction="row">
        <AdminMenu />
        <UserList />
      </Stack>
    </PrivateRoute>
  );
}
