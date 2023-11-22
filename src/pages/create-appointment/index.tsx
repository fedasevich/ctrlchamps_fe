import React, { useState } from 'react';
import Head from 'next/head';
import { useLocales } from 'src/locales';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import AppointmentType from 'src/components/create-appointment/AppointmentType';
import CancelAppointmentModal from 'src/components/modal-cancel-appointment/CancelAppointmentModal';

export default function CreateAppointmentPage(): JSX.Element {
  const { translate } = useLocales();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpen = (): void => setModalOpen(true);
  return (
    <>
      <Head>
        <title>{translate('create_appointment.create')}</title>
      </Head>
      <FlowHeader
        text={translate('create_appointment.header_text')}
        iconType="close"
        callback={handleOpen}
      />
      <AppointmentType />
      <CancelAppointmentModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
