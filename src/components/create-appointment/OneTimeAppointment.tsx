import { Box } from '@mui/material';
import { isBefore, isSameDay } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import OneTimeIcon from 'src/assets/icons/OneTimeIcon';
import { ErrorText } from 'src/components/reusable';
import AppointmentBtn from 'src/components/reusable/appointment-btn/AppointmentBtn';
import { CURRENT_DAY } from 'src/constants';
import useChooseTime from 'src/hooks/useChooseTime';
import { setOneAppointmentTime } from 'src/redux/slices/appointmentSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { setCustomTime } from 'src/utils/defineCustomTime';
import { extractTimeFromDate } from 'src/utils/extractTimeFromDate';

import Appointment from './Appointment';
import { ONE_HOUR_INTERVAL_INDEX, selectTimeOptions } from './constants';
import { AppointmentDuration, Container, ContentContainer } from './styles';
import useShowDuration from './useShowDuration';

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
  const [identicalTime, setIdenticalTime] = useState<boolean>(false);
  const [invalidTime, setInvalidTime] = useState<boolean>(false);

  const { hours, minutes, isDurationSet, minValidDuration } = useShowDuration(startTime, endTime);
  const { chooseStartTime, chooseEndTime } = useChooseTime(
    selectTimeOptions,
    setStartTime,
    setEndTime,
    ONE_HOUR_INTERVAL_INDEX
  );

  useEffect(() => {
    if (!oneTimeDate.startTime || !oneTimeDate.endTime) return;

    const startDateTime = extractTimeFromDate(oneTimeDate.startTime);
    const endDateTime = extractTimeFromDate(oneTimeDate.endTime);

    if (startDateTime && endDateTime) {
      setStartTime(startDateTime);
      setEndTime(endDateTime);
    }
  }, [oneTimeDate.startTime, oneTimeDate.endTime]);

  useEffect(() => {
    if (!startTime || !endTime) return;

    if (startTime === endTime) {
      setIdenticalTime(true);
    } else {
      setIdenticalTime(false);
    }

    checkTimeValidity(startTime > endTime);
  }, [startTime, endTime]);

  const checkTimeValidity = (condition: boolean): void => {
    if (condition) {
      setInvalidTime(true);
    } else {
      setInvalidTime(false);
    }
  };

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
          {invalidTime && (
            <ErrorText>{translate('create_appointment.errors.invalid_time')}</ErrorText>
          )}
          {identicalTime && (
            <ErrorText>{translate('create_appointment.errors.identical_time')}</ErrorText>
          )}
          {startTime && endTime && startTime !== endTime && isDurationSet && !minValidDuration && (
            <ErrorText>{translate('create_appointment.errors.min_appointment_duration')}</ErrorText>
          )}
          {date && isBefore(date, CURRENT_DAY) && !isSameDay(date, CURRENT_DAY) && (
            <ErrorText>{translate('create_appointment.errors.invalid_date')}</ErrorText>
          )}
          {startTime && endTime && date && minValidDuration && !identicalTime && !invalidTime && (
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
          disabled={
            !date ||
            !startTime ||
            !endTime ||
            !minValidDuration ||
            invalidTime ||
            identicalTime ||
            (isBefore(date, CURRENT_DAY) && !isSameDay(date, CURRENT_DAY))
          }
          onClick={goNext}
          onBack={onBack}
        />
      </Container>
    </Box>
  );
}
