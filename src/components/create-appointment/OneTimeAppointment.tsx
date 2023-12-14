import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OneTimeIcon from 'src/assets/icons/OneTimeIcon';
import { DATE_FORMAT } from 'src/constants';
import { setOneAppointmentTime } from 'src/redux/slices/appointmentSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { setCustomTime } from 'src/utils/defineCustomTime';
import { extractTimeFromDate } from 'src/utils/extractTimeFromDate';
import AppointmentBtn from 'src/components/reusable/appointment-btn/AppointmentBtn';
import { selectTimeOptions } from './constants';
import { AppointmentDuration, Container, ContentContainer, SelectContainer } from './styles';
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
        <ContentContainer>
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
        </ContentContainer>
        <AppointmentBtn
          nextText={translate('btn_next')}
          backText={translate('profileQualification.back')}
          disabled={!date || !startTime || !endTime}
          onClick={goNext}
          onBack={onBack}
        />
      </Container>
    </Box>
  );
}
