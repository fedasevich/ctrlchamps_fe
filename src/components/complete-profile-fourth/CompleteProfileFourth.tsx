import { Alert, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { TIMEZONE_FORMAT, weekDays } from 'src/constants';
import { daySelectedType } from 'src/constants/types';
import { useLocales } from 'src/locales';
import { chooseAvailableTime } from 'src/redux/slices/availableDaysSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { useUpdateProfileMutation } from 'src/redux/api/profileCompleteApi';
import { availableTimeOptions } from './constants';
import {
  BaseText,
  BtnWrapper,
  Container,
  NextBtn,
  SelectContainer,
  WeekSlot,
  WeekSlotContainer,
  Wrapper,
} from './styles';

export default function CompleteProfileFourth({ onNext }: { onNext: () => void }): JSX.Element {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const { days: availableDays } = useTypedSelector((state) => state.availableDays);
  const [specifyAvailability] = useUpdateProfileMutation();

  const [daySelected, setDaySelected] = useState<daySelectedType | null>(null);
  const [chosenDays, setChosenDays] = useState<string[]>([]);
  const [availableFrom, setAvailableFrom] = useState<string>('');
  const [availableTo, setAvailableTo] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const selectedDays = availableDays.map(({ day }) => day);
    setChosenDays(selectedDays);
  }, [availableDays]);

  useEffect(() => {
    if (daySelected && availableFrom && availableTo) {
      dispatch(
        chooseAvailableTime({
          time: {
            startTime: availableFrom,
            endTime: availableTo,
            day: daySelected,
          },
        })
      );
    }
  }, [daySelected, availableFrom, availableTo, dispatch]);

  const chooseDay = (selectedDay: daySelectedType): void => {
    const dayAlreadyChosen = availableDays.find(({ day }) => day === selectedDay);
    setDaySelected(selectedDay);

    if (dayAlreadyChosen) {
      setAvailableFrom(dayAlreadyChosen.startTime);
      setAvailableTo(dayAlreadyChosen.endTime);
    } else {
      setAvailableFrom('');
      setAvailableTo('');
    }

    const filtered = availableDays.map(({ day }) => day);
    setChosenDays(filtered);

    if (!dayAlreadyChosen) {
      setChosenDays((prev) => [...prev, selectedDay]);
    }
  };

  const defineAvailableDays = async (): Promise<void> => {
    try {
      setError(false);
      await specifyAvailability({
        updateProfileDto: {
          availability: [...availableDays],
          timeZone: TIMEZONE_FORMAT,
        },
      }).unwrap();
      onNext();
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Wrapper>
      <Container>
        <BaseText>{translate('completeProfileFourth.specify_time')}</BaseText>
        <WeekSlotContainer>
          {weekDays.map((day) => (
            <WeekSlot
              key={day.value}
              className={chosenDays.find((el: string) => el === day.value) ? 'active' : ''}
              onClick={(): void => chooseDay(day.value)}
            >
              {day.abbr}
            </WeekSlot>
          ))}
        </WeekSlotContainer>
        <SelectContainer>
          <FormControl fullWidth variant="standard">
            <InputLabel>{translate('completeProfileFourth.from')}</InputLabel>
            <Select
              disabled={daySelected === null}
              value={availableFrom}
              onChange={(e): void => setAvailableFrom(e.target.value)}
            >
              {availableTimeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard">
            <InputLabel>{translate('completeProfileFourth.to')}</InputLabel>
            <Select
              disabled={daySelected === null}
              value={availableTo}
              onChange={(e): void => setAvailableTo(e.target.value)}
            >
              {availableTimeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SelectContainer>
        <Snackbar
          open={error}
          autoHideDuration={2500}
          onClose={(): void => setError(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity="error">{translate('unexpected_error')}</Alert>
        </Snackbar>
        <BtnWrapper>
          <NextBtn
            onClick={defineAvailableDays}
            disabled={!daySelected || !availableFrom || !availableTo}
          >
            {translate('btn_next')}
          </NextBtn>
        </BtnWrapper>
      </Container>
    </Wrapper>
  );
}
