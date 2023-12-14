import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OneTimeIcon from 'src/assets/icons/OneTimeIcon';
import { FilledButton } from 'src/components/reusable';
import { setOneAppointmentTime } from 'src/redux/slices/appointmentSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { setCustomTime } from 'src/utils/defineCustomTime';
import { extractTimeFromDate } from 'src/utils/extractTimeFromDate';
import Appointment from './Appointment';
import { selectTimeOptions } from './constants';
import { AppointmentDuration, Container } from './styles';
import useShowDuration from './useShowDuration';

export default function OneTimeAppointment({ onNext }: { onNext: () => void }): JSX.Element {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { oneTimeDate } = useTypedSelector((state) => state.appointment);

  const [date, setDate] = useState<Date | null>(oneTimeDate.startTime);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const { hours, minutes } = useShowDuration(startTime, endTime);

  useEffect(() => {
    if (!oneTimeDate.startTime || !oneTimeDate.endTime) return;

    const startDateTime = extractTimeFromDate(oneTimeDate.startTime);
    const endDateTime = extractTimeFromDate(oneTimeDate.endTime);

    if (startDateTime && endDateTime) {
      setStartTime(startDateTime);
      setEndTime(endDateTime);
    }
  }, [oneTimeDate.startTime, oneTimeDate.endTime]);

  const chooseStartTime = (value: string): void => setStartTime(value);
  const chooseEndTime = (value: string): void => setEndTime(value);
  const chooseDate = (value: Date | null): void => setDate(value);

  const goNext = (): void => {
    if (!date) return;
    dispatch(
      setOneAppointmentTime({
        startTime: setCustomTime(date, startTime),
        endTime: setCustomTime(date, endTime),
      })
    );
    onNext();
  };

  return (
    <Box>
      <Container>
        <Appointment
          selectTimeOptions={selectTimeOptions}
          startTime={startTime}
          endTime={endTime}
          date={date}
          chooseStartTime={chooseStartTime}
          chooseEndTime={chooseEndTime}
          chooseDate={chooseDate}
        />
        {startTime && endTime && date && (
          <AppointmentDuration>
            <OneTimeIcon />
            {translate('create_appointment.duration', {
              hours,
              minutes,
            })}
          </AppointmentDuration>
        )}
        <FilledButton onClick={goNext} disabled={!date || !startTime || !endTime}>
          {translate('create_appointment.btn_next')}
        </FilledButton>
      </Container>
    </Box>
  );
}
