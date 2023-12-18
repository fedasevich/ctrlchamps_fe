import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays, isBefore, isSameDay } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OneTimeIcon from 'src/assets/icons/OneTimeIcon';
import { DATE_FORMAT, weekDays } from 'src/constants';
import { setRecurringAppointmentTime } from 'src/redux/slices/appointmentSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { setCustomTime } from 'src/utils/defineCustomTime';
import { extractTimeFromDate } from 'src/utils/extractTimeFromDate';
import AppointmentBtn from 'src/components/reusable/appointment-btn/AppointmentBtn';
import { ONE_DAY, selectTimeOptions } from './constants';
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
  const { hours, minutes } = useShowDuration(startTime, endTime);

  const isBtnDisabled =
    !startDate ||
    !endDate ||
    !startTime ||
    !endTime ||
    !appointmentDays.length ||
    isBefore(endDate, startDate) ||
    isSameDay(startDate, endDate);

  useEffect(() => {
    if (!recurringDate.startDate || !recurringDate.endDate) return;

    const startDateTime = extractTimeFromDate(recurringDate.startDate);
    const endDateTime = extractTimeFromDate(recurringDate.endDate);

    if (startDateTime && endDateTime) {
      setStartTime(startDateTime);
      setEndTime(endDateTime);
    }
  }, [recurringDate.startDate, recurringDate.endDate]);

  const chooseStartTime = (value: string): void => setStartTime(value);
  const chooseEndTime = (value: string): void => setEndTime(value);
  const chooseStartDate = (value: Date | null): void => setStartDate(value);
  const chooseEndDate = (value: Date | null): void => setEndDate(value);

  const chooseDay = (value: string): void => {
    const dayAlreadyChosen = appointmentDays.find((day: string) => day === value);

    if (dayAlreadyChosen) {
      const filtered = appointmentDays.filter((day: string) => day !== value);
      setAppointmentDays(filtered);
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
              <Select
                disabled={!startDate || !endDate}
                value={startTime}
                onChange={(e): void => chooseStartTime(e.target.value)}
              >
                {selectTimeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="standard">
              <InputLabel>{translate('create_appointment.end_time')}</InputLabel>
              <Select
                disabled={!startDate || !endDate}
                value={endTime}
                onChange={(e): void => chooseEndTime(e.target.value)}
              >
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
          {startTime && endTime && (
            <AppointmentDuration>
              <OneTimeIcon />
              {translate('create_appointment.duration', {
                hours,
                minutes,
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
