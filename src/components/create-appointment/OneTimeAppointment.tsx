import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OneTimeIcon from 'src/assets/icons/OneTimeIcon';
import { setOneAppointmentTime } from 'src/redux/slices/appointmentSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { setCustomTime } from 'src/utils/defineCustomTime';
import { extractTimeFromDate } from 'src/utils/extractTimeFromDate';
import AppointmentBtn from 'src/components/reusable/appointment-btn/AppointmentBtn';
import { ErrorText } from 'src/components/reusable';
import Appointment from './Appointment';
import useShowDuration from './useShowDuration';
import { ONE_HOUR_INTERVAL_INDEX, selectTimeOptions } from './constants';
import { AppointmentDuration, Container, ContentContainer } from './styles';

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export default function OneTimeAppointment({ onNext, onBack }: Props): JSX.Element {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { oneTimeDate } = useTypedSelector((state) => state.appointment);

  const [date, setDate] = useState<Date | null>(oneTimeDate.startTime);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const { hours, minutes, isDurationSet, minValidDuration } = useShowDuration(startTime, endTime);

  useEffect(() => {
    if (!oneTimeDate.startTime || !oneTimeDate.endTime) return;

    const startDateTime = extractTimeFromDate(oneTimeDate.startTime);
    const endDateTime = extractTimeFromDate(oneTimeDate.endTime);

    if (startDateTime && endDateTime) {
      setStartTime(startDateTime);
      setEndTime(endDateTime);
    }
  }, [oneTimeDate.startTime, oneTimeDate.endTime]);

  const chooseStartTime = (value: string): void => {
    setStartTime(value);
    const selectedTime = selectTimeOptions.findIndex((el) => el === value);
    const oneHourDifferenceIdx = selectedTime + ONE_HOUR_INTERVAL_INDEX;
    setEndTime(selectTimeOptions[oneHourDifferenceIdx]);
  };

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
        <ContentContainer>
          <Appointment
            selectTimeOptions={selectTimeOptions}
            startTime={startTime}
            endTime={endTime}
            date={date}
            chooseStartTime={chooseStartTime}
            chooseEndTime={chooseEndTime}
            chooseDate={chooseDate}
          />

          {startTime && endTime && isDurationSet && !minValidDuration && (
            <ErrorText>{translate('create_appointment.errors.min_appointment_duration')}</ErrorText>
          )}

          {startTime && endTime && date && minValidDuration && (
            <AppointmentDuration>
              <OneTimeIcon />
              {minutes > 0
                ? translate('create_appointment.duration_with_minutes', {
                    hours,
                    minutes,
                  })
                : translate('create_appointment.duration', {
                    hours,
                  })}
            </AppointmentDuration>
          )}
        </ContentContainer>

        <AppointmentBtn
          nextText={translate('btn_next')}
          backText={translate('profileQualification.back')}
          disabled={!date || !startTime || !endTime || !minValidDuration}
          onClick={goNext}
          onBack={onBack}
        />
      </Container>
    </Box>
  );
}
