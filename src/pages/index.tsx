// next
import Head from 'next/head';
import { useLocales } from 'src/locales';
import Link from 'next/link';

export default function HomePage(): JSX.Element {
  const { translate } = useLocales();

  return (
    <>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      <Link href="example">go to example page</Link>
    </>
  );
}
