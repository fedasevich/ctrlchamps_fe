import Head from 'next/head';
import { useState } from 'react';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';

import CaregiverSchedule from 'src/components/caregiver-schedule/CaregiverSchedule';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';

export default function CaregiverSchedulePage(): JSX.Element | null {
  const { translate } = useLocales();
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);

  return (
    <PrivateRoute allowedRole={USER_ROLE.Caregiver}>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      <MainHeader
        isCalendarVisible={isCalendarVisible}
        setIsCalendarVisible={setIsCalendarVisible}
      />
      <CaregiverSchedule isCalendarVisible={isCalendarVisible} />
    </PrivateRoute>
  );
}
