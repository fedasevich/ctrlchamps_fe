// next
import Head from 'next/head';
import { useState } from 'react';
import Appointments from 'src/components/appointments/Appointments';
import BookAppointment from 'src/components/book-appointment/BookAppointment';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { useLocales } from 'src/locales';
import { mockedAppointments } from 'src/components/appointments/helpers';
import CaregiverSchedule from 'src/components/caregiver-schedule/CaregiverSchedule';
import { ActiveTab } from 'src/components/reusable/header/types';
import { TabType } from 'src/components/reusable/header/enums';

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
