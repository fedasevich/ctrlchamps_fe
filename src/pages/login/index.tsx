import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLocales } from 'src/locales';
import LoginWrapper from 'src/components/login-form/LoginWrapper';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import LoginForm from 'src/components/login-form/LoginForm';
import SignUpFooter from 'src/components/reusable/footer';

export default function Login(): JSX.Element {
  const { translate } = useLocales();
  const { back: pushBack } = useRouter();

  return (
    <>
      <Head>
        <title>{translate('loginForm.title')}</title>
      </Head>
      <FlowHeader text={translate('loginForm.title')} callback={pushBack} iconType="back" />
      <LoginWrapper>
        <>
          <LoginForm />
          <SignUpFooter />
        </>
      </LoginWrapper>
    </>
  );
}
