import React from 'react';
import Head from 'next/head';
import { useLocales } from 'src/locales';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import AppointmentType from 'src/components/create-appointment/AppointmentType';

export default function CreateAppointmentPage(): JSX.Element {
  const { translate } = useLocales();
  return (
    <>
      <Head>
        <title>{translate('loginForm.title')}</title>
      </Head>
      <FlowHeader text="New Appointment" iconType="close" callback={(): void => {}} />

      <AppointmentType />
    </>
  );
}
