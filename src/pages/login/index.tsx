import React from 'react';
import Head from 'next/head';
import LoginWrapper from 'src/components/login-form/LoginWrapper';
import SignUpHeader from 'src/components/reusable/header';
import LoginForm from 'src/components/login-form/LoginForm';

export default function Login(): JSX.Element {
  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <SignUpHeader text="Sign In" />
      <LoginWrapper>
        <LoginForm />
      </LoginWrapper>
    </>
  );
}
