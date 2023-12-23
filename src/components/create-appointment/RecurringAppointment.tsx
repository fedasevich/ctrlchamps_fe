import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays, isBefore, isSameDay } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OneTimeIcon from 'src/assets/icons/OneTimeIcon';
import AppointmentBtn from 'src/components/reusable/appointment-btn/AppointmentBtn';
import { DATE_FORMAT, weekDays } from 'src/constants';
import { setRecurringAppointmentTime } from 'src/redux/slices/appointmentSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { setCustomTime } from 'src/utils/defineCustomTime';
import { extractTimeFromDate } from 'src/utils/extractTimeFromDate';
import { getWeekDaysRange } from 'src/utils/getWeekDaysRange';
import { ErrorText } from 'src/components/reusable';
import {
  FIRST_WEEK_DAY_IDX,
  LAST_WEEK_DAY_IDX,
  ONE_DAY,
  ONE_HOUR_INTERVAL_INDEX,
  selectTimeOptions,
} from './constants';
import {
  AppointmentDuration,
  BaseBoldText,
  Container,
  ContentContainer,
  DatePickerContainer,
  SelectContainer,
  WeekSlot,
  WeekSlotContainer,
} from './styles';
import useShowDuration from './useShowDuration';

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export default function RecurringAppointment({ onNext, onBack }: Props): JSX.Element {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { recurringDate } = useTypedSelector((state) => state.appointment);

  const [startDate, setStartDate] = useState<Date | null>(recurringDate.startDate);
  const [endDate, setEndDate] = useState<Date | null>(recurringDate.endDate);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [appointmentDays, setAppointmentDays] = useState<string[]>(recurringDate.weekDays);
  const [invalidWeekDaysRange, setInvalidWeekDaysRange] = useState<boolean>(false);
  const { hours, minutes, isDurationSet, minValidDuration } = useShowDuration(startTime, endTime);

  const isBtnDisabled =
    !startDate ||
    !endDate ||
    !startTime ||
    !endTime ||
    !appointmentDays.length ||
    !minValidDuration ||
    isBefore(endDate, startDate) ||
    isSameDay(startDate, endDate);

  const isAppointmentDurationShown =
    startTime && endTime && startDate && endDate && minValidDuration && !invalidWeekDaysRange;

  useEffect(() => {
    if (!recurringDate.startDate || !recurringDate.endDate) return;

    const startDateTime = extractTimeFromDate(recurringDate.startDate);
    const endDateTime = extractTimeFromDate(recurringDate.endDate);

    if (startDateTime && endDateTime) {
      setStartTime(startDateTime);
      setEndTime(endDateTime);
    }
  }, [recurringDate.startDate, recurringDate.endDate]);

  const chooseStartTime = (value: string): void => {
    setStartTime(value);
    const selectedTime = selectTimeOptions.findIndex((el) => el === value);
    const oneHourDifferenceIdx = selectedTime + ONE_HOUR_INTERVAL_INDEX;
    setEndTime(selectTimeOptions[oneHourDifferenceIdx]);
  };

  const chooseEndTime = (value: string): void => setEndTime(value);

  const chooseStartDate = (value: Date | null): void => {
    setStartDate(value);
    setInvalidWeekDaysRange(false);
  };

  const chooseEndDate = (value: Date | null): void => {
    setEndDate(value);
    setInvalidWeekDaysRange(false);
  };

  const chooseDay = (value: string): void => {
    const dayAlreadyChosen = appointmentDays.find((day: string) => day === value);
    const availableDaysToChoose = getWeekDaysRange(startDate, endDate);
    setInvalidWeekDaysRange(false);

    if (dayAlreadyChosen) {
      const filtered = appointmentDays.filter((day: string) => day !== value);
      setAppointmentDays(filtered);

      return;
    }
    if (!availableDaysToChoose.includes(value)) {
      setInvalidWeekDaysRange(true);

      return;
    }

    setAppointmentDays((prev) => [...prev, value]);
  };

  const goNext = (): void => {
    if (!startDate || !endDate) return;
    dispatch(
      setRecurringAppointmentTime({
        startDate: setCustomTime(startDate, startTime),
        endDate: setCustomTime(endDate, endTime),
        weekDays: appointmentDays,
      })
    );
    onNext();
  };

  return (
    <Box>
      <Container>
        <ContentContainer>
          <DatePickerContainer>
            <DatePicker
              label={translate('create_appointment.start_date')}
              minDate={new Date()}
              value={startDate}
              inputFormat={DATE_FORMAT}
              onChange={(newValue): void => {
                chooseStartDate(newValue);
              }}
              renderInput={(props) => (
                <TextField
                  autoComplete="off"
                  InputProps={{ readOnly: true }}
                  variant="standard"
                  {...props}
                  helperText={null}
                />
              )}
            />
            <DatePicker
              label={translate('create_appointment.end_date')}
              minDate={startDate && addDays(startDate, ONE_DAY)}
              value={endDate}
              inputFormat={DATE_FORMAT}
              onChange={(newValue): void => {
                chooseEndDate(newValue);
              }}
              renderInput={(props) => (
                <TextField
                  autoComplete="off"
                  InputProps={{ readOnly: true }}
                  variant="standard"
                  {...props}
                  helperText={null}
                />
              )}
            />
          </DatePickerContainer>
          <SelectContainer>
            <FormControl fullWidth variant="standard">
              <InputLabel>{translate('create_appointment.start_time')}</InputLabel>
              <Select value={startTime} onChange={(e): void => chooseStartTime(e.target.value)}>
                {selectTimeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="standard">
              <InputLabel>{translate('create_appointment.end_time')}</InputLabel>
              <Select value={endTime} onChange={(e): void => chooseEndTime(e.target.value)}>
                {selectTimeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </SelectContainer>
          <BaseBoldText>{translate('create_appointment.select_days')}</BaseBoldText>
          <WeekSlotContainer>
            {weekDays.map((day) => (
              <WeekSlot
                key={day.value}
                className={appointmentDays.find((el: string) => el === day.value) ? 'active' : ''}
                onClick={(): void => chooseDay(day.value)}
              >
                {day.abbr}
              </WeekSlot>
            ))}
          </WeekSlotContainer>
          {invalidWeekDaysRange && (
            <ErrorText>
              {translate('create_appointment.errors.invalid_week_days', {
                dayFrom: getWeekDaysRange(startDate, endDate)[FIRST_WEEK_DAY_IDX],
                dayTo: getWeekDaysRange(startDate, endDate).at(LAST_WEEK_DAY_IDX),
              })}
            </ErrorText>
          )}
          {startTime && endTime && isDurationSet && !minValidDuration && (
            <ErrorText>{translate('create_appointment.errors.min_appointment_duration')}</ErrorText>
          )}
          {isAppointmentDurationShown && (
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
          onClick={goNext}
          onBack={onBack}
          disabled={isBtnDisabled}
        />
      </Container>
    </Box>
  );
}
