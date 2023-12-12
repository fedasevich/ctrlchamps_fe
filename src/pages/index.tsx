import Head from 'next/head';
import Appointments from 'src/components/appointments/Appointments';
import BookAppointment from 'src/components/book-appointment/BookAppointment';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { useLocales } from 'src/locales';
import { mockedAppointments } from 'src/components/appointments/helpers';

export default function HomePage(): JSX.Element {
  const { translate } = useLocales();

  return (
    <>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      <MainHeader />
      {mockedAppointments.length > 0 ? (
        <Appointments appointments={mockedAppointments} />
      ) : (
        <BookAppointment />
      )}
    </>
  );
}
