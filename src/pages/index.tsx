// next
import { useState } from 'react';
import { Button } from '@mui/material';
import Head from 'next/head';
import Appointments from 'src/components/appointments/Appointments';
import BookAppointment from 'src/components/book-appointment/BookAppointment';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { useLocales } from 'src/locales';
import { mockedAppointments } from 'src/components/appointments/helpers';

export default function HomePage(): JSX.Element {
  const { translate } = useLocales();
  const [isOpen, setIsOpen] = useState(false);

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
      activity: ['Test activity 1', 'Test activity 2', 'Test activity 3'],
      env: [
        'Cant woke on ladder',
        'Cant woke on ladder',
        'Cant woke on ladder',
        'Cant woke on ladder',
      ],
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
      <MainHeader />
      {mockedAppointments.length > 0 ? (
        <Appointments appointments={mockedAppointments} />
      ) : (
        <BookAppointment />
      )}
    </>
  );
}
