import Head from 'next/head';
import { useState } from 'react';

import CaregiverSchedule from 'src/components/caregiver-schedule/CaregiverSchedule';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { TabType } from 'src/components/reusable/header/enums';
import { ActiveTab } from 'src/components/reusable/header/types';
import { useLocales } from 'src/locales';

export default function HomePage(): JSX.Element {
  const { translate } = useLocales();
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);

  return (
    <>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      <MainHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <CaregiverSchedule isCalendarVisible={activeTab === TabType.appointment} />
    </>
  );
}
