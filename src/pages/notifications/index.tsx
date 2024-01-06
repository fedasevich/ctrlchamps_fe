import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLocales } from 'src/locales';
import { useTypedSelector } from 'src/redux/store';
import { DEFAULT_REDIRECT_PATH } from 'src/constants';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { Background } from 'src/components/appointments/styles';
import NotificationsList from 'src/components/notifications-list/NotificationsList';
import { useFetchNotificationsQuery } from 'src/redux/api/notificationsApi';

export default function NotificationsPage(): JSX.Element | null {
  const { translate } = useLocales();
  const router = useRouter();
  const user = useTypedSelector((state) => state.user.user);

  const { id } = user || { id: '' };
  const { data: notifications } = useFetchNotificationsQuery(id);

  useEffect(() => {
    if (!user) {
      router.replace(DEFAULT_REDIRECT_PATH);
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      <MainHeader />
      <Background>
        <NotificationsList notifications={notifications || []} />
      </Background>
    </>
  );
}
