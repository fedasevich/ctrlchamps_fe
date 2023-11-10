import React from 'react';
import Head from 'next/head';
import ExampleForm from '../../components/example-form';
import SignUpSecond from 'src/components/sign-up-second/SignUpSecond';

export default function ExamplePage(): JSX.Element {
  const caregiver = 'caregiver';
  return (
    <>
      <Head>
        <title> Example page title</title>
      </Head>
      <SignUpSecond role={caregiver} />
    </>
  );
}
