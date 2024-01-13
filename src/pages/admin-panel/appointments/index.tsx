import Head from 'next/head';
import { Stack } from '@mui/material';

import AdminAppointmentList from 'src/components/admin-appointment-list/AppointmentList';
import AdminMenu from 'src/components/admin-menu/AdminMenu';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';

export default function AdminManagementPage(): JSX.Element {
  const { translate } = useLocales();

  return (
    <PrivateRoute allowedRoles={[USER_ROLE.SuperAdmin, USER_ROLE.Admin]}>
      <Head>
        <title>{translate('adminAppointmentList.title')}</title>
      </Head>
      <Stack direction="row">
        <AdminMenu />
        <AdminAppointmentList />
      </Stack>
    </PrivateRoute>
  );
}
