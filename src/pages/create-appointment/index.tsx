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
        <title>{translate('create_appointment.create')}</title>
      </Head>
      <FlowHeader
        text={translate('create_appointment.header_text')}
        iconType="close"
        callback={(): void => {}}
      />

      <AppointmentType />
    </>
  );
}
