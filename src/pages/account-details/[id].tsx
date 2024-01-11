import Head from 'next/head';
import { useRouter } from 'next/router';
import AccountDetails from 'src/components/account-details/AccountDetails';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { useLocales } from 'src/locales';
import { useGetUserInfoQuery } from 'src/redux/api/userApi';

export default function AccountDetailsPageId(): JSX.Element | null {
  const { translate } = useLocales();
  const router = useRouter();
  const { id } = router.query;

  const { data: user, isLoading, isSuccess } = useGetUserInfoQuery(id);

  if (isLoading) return null;

  return (
    <PrivateRoute>
      <Head>
        <title>{translate('accountDetails.title')}</title>
      </Head>
      <MainHeader />
      {isSuccess && <AccountDetails user={user} isAdmin />}
    </PrivateRoute>
  );
}
