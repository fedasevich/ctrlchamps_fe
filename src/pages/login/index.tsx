import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLocales } from 'src/locales';
import LoginWrapper from 'src/components/login-form/LoginWrapper';
import SignUpHeader from 'src/components/reusable/header';
import LoginForm from 'src/components/login-form/LoginForm';
import SignUpFooter from 'src/components/reusable/footer';

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
        callback={(): Promise<boolean> => router.push('/')}
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
