import Head from 'next/head';

import AdminMenu from 'src/components/admin-menu/AdminMenu';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';

export default function AdminPanelPage(): JSX.Element {
  const { translate } = useLocales();

  return (
    <PrivateRoute allowedRoles={[USER_ROLE.SuperAdmin]}>
      <Head>
        <title>{translate('adminManagement.title')}</title>
      </Head>
      <AdminMenu />
    </PrivateRoute>
  );
}
