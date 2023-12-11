import Head from 'next/head';
import CreateAppointmentFourth from 'src/components/create-appointment-fourth/CreateAppointmentFourth';
import { useLocales } from 'src/locales';
import { useTypedSelector } from 'src/redux/store';

export default function CreateAppointmentPage(): JSX.Element {
  const { translate } = useLocales();
  const { appointmentType } = useTypedSelector((state) => state.appointment);

  return (
    <>
      <Head>
        <title>{translate('create_appointment.create')}</title>
      </Head>
      <CreateAppointmentFourth onNext={() => undefined} />
    </>
  );
}
