import Head from 'next/head';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';

import MainHeader from 'src/components/reusable/header/MainHeader';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';

export default function CaregiverSchedulePage(): JSX.Element | null {
  const { translate } = useLocales();

  return (
    <PrivateRoute allowedRole={USER_ROLE.Caregiver}>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      <MainHeader />
    </PrivateRoute>
  );
}
