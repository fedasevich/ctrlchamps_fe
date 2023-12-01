import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import OneTimeIcon from 'src/assets/icons/OneTimeIcon';
import { FilledButton } from 'src/components/reusable';
import { DATE_FORMAT } from 'src/constants';
import { setOneAppointmentTime } from 'src/redux/slices/appointmentSlice';
import { useAppDispatch } from 'src/redux/store';
import { setCustomTime } from 'src/utils/defineCustomTime';
import { selectTimeOptions } from './constants';
import { AppointmentDuration, Container, SelectContainer } from './styles';
import useShowDuration from './useShowDuration';

export default function OneTimeAppointment(): JSX.Element {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();

  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const { hours, minutes } = useShowDuration(startTime, endTime);

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
  };

  return (
    <Box>
      <Container>
        <SelectContainer>
          <FormControl fullWidth variant="standard">
            <InputLabel>{translate('completeProfileFourth.from')}</InputLabel>
            <Select value={startTime} onChange={(e): void => chooseStartTime(e.target.value)}>
              {selectTimeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard">
            <InputLabel>{translate('completeProfileFourth.to')}</InputLabel>
            <Select value={endTime} onChange={(e): void => chooseEndTime(e.target.value)}>
              {selectTimeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SelectContainer>
        <DatePicker
          label={translate('date')}
          minDate={new Date()}
          value={date}
          inputFormat={DATE_FORMAT}
          onChange={(newValue): void => {
            chooseDate(newValue);
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
