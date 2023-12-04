// next
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLocales } from 'src/locales';
import BookAppointment from 'src/components/book-appointment/BookAppointment';

export default function HomePage(): JSX.Element {
  const { translate } = useLocales();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      <BookAppointment onNext={(): Promise<boolean> => router.push('/create-appointment')} />
    </>
  );
}
