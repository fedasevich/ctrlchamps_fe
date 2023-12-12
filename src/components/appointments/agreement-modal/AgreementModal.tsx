import { useLocales } from 'src/locales';
import { APPOINTMENT_TYPE } from 'src/constants';

import { DetailedAppointment } from 'src/components/appointments/types';
import {
  CURRENT_DATE,
  PAYMENT_DAY,
  MILEAGE_PRICE,
  RENT_PRICE,
} from 'src/components/appointments/constants';
import { getHoursForWeek } from 'src/components/appointments/helpers';

import { Container, SubTitle, Text, Span, TaskList, Task } from './styles';

interface IProps {
  appointment: DetailedAppointment | undefined;
}

export default function AgreementModal({ appointment }: IProps): JSX.Element | null {
  const { translate } = useLocales();

  if (!appointment) return null;

  const hoursPerWeek = getHoursForWeek(appointment.endDate, appointment.startDate);

  return (
    <Container>
      <div>
        <SubTitle>{translate('appointments_page.terms.term_of_agreement_title')}</SubTitle>
        <Text>
          {translate('appointments_page.terms.term_of_agreement_text1')}
          <Span>{CURRENT_DATE}</Span>
          {translate('appointments_page.terms.term_of_agreement_text2')}
        </Text>
      </div>
      <div>
        <SubTitle>{translate('appointments_page.terms.purpose_title')}</SubTitle>
        <Text>{translate('appointments_page.terms.purpose_text')}</Text>
      </div>
      <div>
        <SubTitle>{translate('appointments_page.terms.services_title')}</SubTitle>
        <Text>{translate('appointments_page.terms.services_text')}</Text>
        <TaskList>
          {appointment.seekerTasks.map((task) => (
            <Task key={task.appointmentId}>{task.name}</Task>
          ))}
        </TaskList>
      </div>
      {appointment.type === APPOINTMENT_TYPE.Recurring && (
        <div>
          <SubTitle>{translate('appointments_page.terms.schedule_title')}</SubTitle>
          <Text>
            {translate('appointments_page.terms.schedule_text1')}
            <Span>{hoursPerWeek}</Span>
            {translate('appointments_page.terms.schedule_text2')}
          </Text>
        </div>
      )}
      <div>
        <Text>
          {translate('appointments_page.terms.payment_text1')}
          <Span>{appointment.payment}</Span>
          {translate('appointments_page.terms.payment_text2')}
          <Span>{PAYMENT_DAY}</Span>
          {translate('appointments_page.terms.payment_text3')}
        </Text>
      </div>
      <div>
        <Text>
          {translate('appointments_page.terms.mileage_text1')}
          <Span>{MILEAGE_PRICE}</Span>
          {translate('appointments_page.terms.mileage_text2')}
        </Text>
      </div>
      <div>
        <Text>
          {translate('appointments_page.terms.home_living_text1')}
          <Span>{RENT_PRICE}</Span>
          {translate('appointments_page.terms.home_living_text2')}
        </Text>
      </div>
    </Container>
  );
}
