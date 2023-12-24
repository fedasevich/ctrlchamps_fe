import Head from 'next/head';
import { useState } from 'react';
import CaregiverInfo from 'src/components/caregiver-info/CaregiverInfo';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { ActiveTab } from 'src/components/reusable/header/types';
import { useLocales } from 'src/locales';

export default function CaregiverProfile(): JSX.Element {
  const { translate } = useLocales();

  const [activeTab, setActiveTab] = useState<ActiveTab>(null);

  return (
    <>
      <Head>
        <title>{translate('caregiverProfile.title')}</title>
      </Head>
      <MainHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <CaregiverInfo />
    </>
  );
}
