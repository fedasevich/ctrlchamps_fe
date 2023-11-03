import React from 'react';
import Head from 'next/head';
import ExampleContent from 'src/sections/example/ExampleContent';

export default function ExamplePage(): JSX.Element {
  return (
    <>
      <Head>
        <title> Example page title</title>
      </Head>
      <ExampleContent />
    </>
  );
}
