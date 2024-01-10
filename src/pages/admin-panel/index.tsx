import Head from 'next/head';

import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';

export default function AdminPanelPage(): JSX.Element | null {
  const { translate } = useLocales();

  return (
    <PrivateRoute allowedRoles={[USER_ROLE.Admin, USER_ROLE.SuperAdmin]}>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
    </PrivateRoute>
  );
}
