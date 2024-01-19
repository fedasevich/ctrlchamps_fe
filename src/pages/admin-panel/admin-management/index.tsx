import Head from 'next/head';

import AdminManagement from 'src/components/admin-management/AdminManagement';
import AdminMenu from 'src/components/admin-menu/AdminMenu';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { StyledStack } from '../styles';

export default function AdminManagementPage(): JSX.Element {
  const { translate } = useLocales();

  return (
    <PrivateRoute allowedRoles={[USER_ROLE.SuperAdmin]}>
      <Head>
        <title>{translate('adminManagement.title')}</title>
      </Head>
      <StyledStack>
        <AdminMenu />
        <AdminManagement />
      </StyledStack>
    </PrivateRoute>
  );
}
