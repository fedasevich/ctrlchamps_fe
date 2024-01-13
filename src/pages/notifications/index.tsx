import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Background } from 'src/components/appointments/styles';
import NotificationsList from 'src/components/notifications-list/NotificationsList';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { DEFAULT_REDIRECT_PATH } from 'src/constants';
import { useLocales } from 'src/locales';
import { useFetchNotificationsQuery } from 'src/redux/api/notificationsApi';
import { useTypedSelector } from 'src/redux/store';

export default function NotificationsPage(): JSX.Element | null {
  const { translate } = useLocales();
  const router = useRouter();
  const user = useTypedSelector((state) => state.user.user);

  const { id } = user || { id: '' };
  const { data: notifications, isLoading } = useFetchNotificationsQuery(id);

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
        <NotificationsList isLoading={isLoading} notifications={notifications || []} />
      </Background>
    </>
  );
}
