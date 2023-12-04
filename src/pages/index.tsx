// next
import Head from 'next/head';
import { useLocales } from 'src/locales';
import BookAppointment from 'src/components/book-appointment/BookAppointment';

export default function HomePage(): JSX.Element {
  const { translate } = useLocales();

  return (
    <>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      <BookAppointment />
    </>
  );
}
