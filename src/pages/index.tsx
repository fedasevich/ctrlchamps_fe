import Head from 'next/head';

import Appointments from 'src/components/appointments/Appointments';
import BookAppointment from 'src/components/book-appointment/BookAppointment';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { useLocales } from 'src/locales';
import { useGetAllAppointmentsQuery } from 'src/redux/api/appointmentApi';

export default function HomePage(): JSX.Element | null {
  const { translate } = useLocales();

  const { data: appointments, isSuccess, isLoading } = useGetAllAppointmentsQuery();

  if (isLoading) return null;

  return (
    <>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      <MainHeader />
      {isSuccess && appointments.length > 0 ? (
        <Appointments appointments={appointments} />
      ) : (
        <BookAppointment />
      )}
    </>
  );
}
