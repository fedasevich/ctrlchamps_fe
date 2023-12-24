import { useState } from 'react';
import Head from 'next/head';

import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import MainHeader from 'src/components/reusable/header/MainHeader';
import AccountDetails from 'src/components/account-details/AccountDetails';
import { useLocales } from 'src/locales';
import { ActiveTab } from 'src/components/reusable/header/types';
import { useTypedSelector } from 'src/redux/store';
import { useGetUserInfoQuery } from 'src/redux/api/userApi';

export default function CaregiverSchedulePage(): JSX.Element | null {
  const { translate } = useLocales();
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const userId = useTypedSelector((state) => state.user.user?.id);

  const { data: userInfo, isLoading, isSuccess } = useGetUserInfoQuery(userId);

  if (isLoading) return null;

  return (
    <PrivateRoute>
      <Head>
        <title>{translate('accountDetails.title')}</title>
      </Head>
      <MainHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {isSuccess && <AccountDetails user={userInfo} />}
    </PrivateRoute>
  );
}
