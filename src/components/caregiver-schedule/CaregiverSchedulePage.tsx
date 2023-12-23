import Head from 'next/head';
import { useState } from 'react';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';

import CaregiverSchedule from 'src/components/caregiver-schedule/CaregiverSchedule';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { TabType } from '../reusable/header/enums';
import { ActiveTab } from '../reusable/header/types';

export default function CaregiverSchedulePage(): JSX.Element | null {
  const { translate } = useLocales();
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);

  return (
    <PrivateRoute allowedRole={USER_ROLE.Caregiver}>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      <MainHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <CaregiverSchedule isCalendarVisible={activeTab === TabType.mainPage} />
    </PrivateRoute>
  );
}
