import React from 'react';
import Head from 'next/head';
import { useLocales } from 'src/locales';
import { useRouter } from 'next/router';
import LoginWrapper from 'src/components/login-form/LoginWrapper';
import SignUpHeader from 'src/components/reusable/header';
import LoginForm from 'src/components/login-form/LoginForm';
import SignUpFooter from 'src/components/reusable/footer';
import { ROUTES } from 'src/routes';

export default function Login(): JSX.Element {
  const { translate } = useLocales();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{translate('loginForm.title')}</title>
      </Head>
      <SignUpHeader
        text={translate('loginForm.title')}
        callback={(): Promise<boolean> => router.push(ROUTES.home)}
      />
      <LoginWrapper>
        <>
          <LoginForm />
          <SignUpFooter />
        </>
      </LoginWrapper>
    </>
  );
}
