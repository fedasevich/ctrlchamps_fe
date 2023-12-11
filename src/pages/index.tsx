// next
import { Button } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import AppointmentRequestModal from 'src/components/appointment-request-modal';
import BookAppointment from 'src/components/book-appointment/BookAppointment';
import { useLocales } from 'src/locales';

export default function HomePage(): JSX.Element {
  const { translate } = useLocales();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const switchModal = () => {
    setIsOpen(!isOpen);
  };
  const appointment = {
    name: 'Comprehensive Medical Management Plan',
    status: 'Pending Comfirmation',
    seeker: 'Smith Jacobs',
    appointmentDate: '21 Jun',
    appointmentTime: '14:00',
    health_questionnaire: {
      diagnoses: ['Alzheimer', 'Down syndrom', 'Snizze'],
      activity: ['LJKfhs', 'fdsfas'],
      env: ['Cant woke on ladder'],
    },
    tasks: ['Meal preparation', 'Transpotation', 'HouseKeeping'],
    details: 'Nothing specific',
    notes: ['My note text, skibidi dip dip cha cha cha'],
  };

  return (
    <>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      <Button onClick={switchModal}>Open Modal</Button>
      <BookAppointment />
      <AppointmentRequestModal
        appointment={appointment}
        isOpen={isOpen}
        switchModalVisibility={switchModal}
      />
    </>
  );
}
