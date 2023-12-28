import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Background } from 'src/components/appointments/styles';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { ActiveTab } from 'src/components/reusable/header/types';
import TransactionsModal from 'src/components/transactions/TransactionsModal';
import { DEFAULT_REDIRECT_PATH } from 'src/constants';
import { useLocales } from 'src/locales';
import { useGetTransactionsQuery } from 'src/redux/api/transactionsApi';
import { UserRole } from 'src/redux/slices/userSlice';
import { useTypedSelector } from 'src/redux/store';

const TransactionsModalPage = (): JSX.Element | null => {
  const router = useRouter();
  const { translate } = useLocales();

  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const user = useTypedSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      router.replace(DEFAULT_REDIRECT_PATH);
    }
  }, [user, router]);

  const { id, role } = user || { id: '', role: '' };
  const { data: transactions = [] } = useGetTransactionsQuery(id);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      <MainHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <Background>
        <TransactionsModal transactions={transactions} role={role as UserRole} />
      </Background>
    </>
  );
};

export default TransactionsModalPage;
