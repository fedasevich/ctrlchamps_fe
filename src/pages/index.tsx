// next
import Head from 'next/head';
import BookAppointment from 'src/components/book-appointment/BookAppointment';
import { useLocales } from 'src/locales';

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
