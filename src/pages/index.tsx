
import Head from 'next/head';
import { useState } from 'react';
import CaregiverSchedule from 'src/components/caregiver-schedule/CaregiverSchedule';
import Appointments from 'src/components/appointments/Appointments';
import BookAppointment from 'src/components/book-appointment/BookAppointment';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { TabType } from 'src/components/reusable/header/enums';
import { ActiveTab } from 'src/components/reusable/header/types';
import { useLocales } from 'src/locales';
import { useGetAllAppointmentsQuery } from 'src/redux/api/appointmentApi';

export default function HomePage(): JSX.Element | null {
  const { translate } = useLocales();
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);

  if (!user) {
    router.replace(DEFAULT_REDIRECT_PATH);
    return null;
  }

  const { role } = user;

  return (
    <PrivateRoute>
      {role === USER_ROLE.Caregiver && <CaregiverSchedulePage />}
      {role === USER_ROLE.Seeker && <AppointmentsPage />}
    </PrivateRoute>
  );
}
