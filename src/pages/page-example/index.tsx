import React from 'react';
import Head from 'next/head';
import ExampleForm from '../../components/example-form';
import UserList from 'src/components/user-list/UserList';

export default function ExamplePage(): JSX.Element {
  return (
    <>
      <Head>
        <title> Example page title</title>
      </Head>
      <UserList />
    </>
  );
}
