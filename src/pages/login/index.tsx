import React from 'react';
import Head from 'next/head';
import { useLocales } from 'src/locales';
import LoginWrapper from 'src/components/login-form/LoginWrapper';
import SignUpHeader from 'src/components/reusable/header';
import LoginForm from 'src/components/login-form/LoginForm';

export default function Login(): JSX.Element {
  const { translate } = useLocales();
  return (
    <>
      <Head>
        <title>{translate('loginForm.title')}</title>
      </Head>
      <SignUpHeader text={translate('loginForm.title')} />
      <LoginWrapper>
        <LoginForm />
      </LoginWrapper>
    </>
  );
}
