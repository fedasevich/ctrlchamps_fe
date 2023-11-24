import { useState } from 'react';
import { useLocales } from 'src/locales';
import OneTimeIcon from 'src/assets/icons/OneTimeIcon';
import RecurringIcon from 'src/assets/icons/RecurringIcon';
import { ErrorText, FilledButton } from '../reusable';
import { MAX_APPOINTMENT_NAME_LENGTH, MIN_APPOINTMENT_NAME_LENGTH } from './constants';
import {
  AppointmentTypeCard,
  AppointmentTypeContainer,
  AppointmentTypeDetails,
  AppointmentTypeInput,
  AppointmentTypeText,
  Background,
  IconWrapper,
} from './styles';
import { AppointmentTypeI } from './types';
import { Appointment } from './enums';

export default function AppointmentType(): JSX.Element {
  const { translate } = useLocales();
  const [appointmentName, setAppointmentName] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<AppointmentTypeI | null>(null);

  const selectOneTime = (): void => setAppointmentType(Appointment.oneTime);
  const selectRecurring = (): void => setAppointmentType(Appointment.recurring);
  const changeAppointmentName = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => setAppointmentName(e.target.value);

  return (
    <Background>
      <AppointmentTypeContainer>
        <AppointmentTypeInput
          label={translate('create_appointment.placeholder.name')}
          variant="standard"
          autoComplete="off"
          fullWidth
          size="small"
          value={appointmentName}
          onChange={changeAppointmentName}
        />
        {appointmentName.length > MAX_APPOINTMENT_NAME_LENGTH && (
          <ErrorText>{translate('create_appointment.errors.max_type_char')}</ErrorText>
        )}
        <AppointmentTypeCard
          className={appointmentType === Appointment.oneTime ? 'active' : ''}
          onClick={selectOneTime}
        >
          <IconWrapper>
            <OneTimeIcon />
          </IconWrapper>
          <AppointmentTypeText>{translate('create_appointment.type.one')}</AppointmentTypeText>
          <AppointmentTypeDetails>
            {translate('create_appointment.type.one_desc')}
          </AppointmentTypeDetails>
        </AppointmentTypeCard>
        <AppointmentTypeCard
          className={appointmentType === Appointment.recurring ? 'active' : ''}
          onClick={selectRecurring}
        >
          <IconWrapper>
            <RecurringIcon />
          </IconWrapper>
          <AppointmentTypeText>
            {translate('create_appointment.type.recurring')}
          </AppointmentTypeText>
          <AppointmentTypeDetails>
            {translate('create_appointment.type.recurring_desc')}
          </AppointmentTypeDetails>
        </AppointmentTypeCard>
        <FilledButton
          disabled={
            appointmentType === null ||
            appointmentName.length <= MIN_APPOINTMENT_NAME_LENGTH ||
            appointmentName.length > MAX_APPOINTMENT_NAME_LENGTH
          }
        >
          {translate('create_appointment.btn_next')}
        </FilledButton>
      </AppointmentTypeContainer>
    </Background>
  );
}
