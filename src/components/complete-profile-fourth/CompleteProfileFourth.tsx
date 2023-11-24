import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { weekDays } from 'src/constants';
import { daySelectedType } from 'src/constants/types';
import { useLocales } from 'src/locales';
import { chooseAvailableTime } from 'src/redux/slices/availableDaysSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
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

  const availableDays = useTypedSelector((state) => state.availableDays);
  const dispatch = useAppDispatch();

  const [daySelected, setDaySelected] = useState<daySelectedType | null>(null);
  const [chosenDays, setChosenDays] = useState<string[]>([]);

  const [availableFrom, setAvailableFrom] = useState<string>('');
  const [availableTo, setAvailableTo] = useState<string>('');

  const chooseDay = (selectedDay: daySelectedType): void => {
    const previousDay = daySelected;
    const dayAlreadyChosen = chosenDays.find((day: string) => day === selectedDay);

    setDaySelected(selectedDay);
    setAvailableFrom(availableDays.days[selectedDay].time.from);
    setAvailableTo(availableDays.days[selectedDay].time.to);

    if (dayAlreadyChosen && previousDay && !availableDays.days[previousDay].time.from) {
      const filtered = chosenDays.filter((day) => day !== previousDay);
      setChosenDays(filtered);
    }

    if (!dayAlreadyChosen) {
      setChosenDays((prev) => [...prev, selectedDay]);
    }
  };

  const chooseFromDate = (value: string): void => {
    setAvailableFrom(value);
  };

  const chooseToDate = (value: string): void => {
    setAvailableTo(value);
  };

  useEffect(() => {
    if (daySelected && availableFrom && availableTo) {
      dispatch(
        chooseAvailableTime({
          time: {
            from: availableFrom,
            to: availableTo,
          },
          weekDay: daySelected,
        })
      );
    }
  }, [daySelected, availableFrom, availableTo, dispatch]);

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
              onChange={(e): void => chooseFromDate(e.target.value)}
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
              onChange={(e): void => chooseToDate(e.target.value)}
            >
              {availableTimeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SelectContainer>
        <BtnWrapper>
          <NextBtn onClick={onNext} disabled={!daySelected || !availableFrom || !availableTo}>
            {translate('btn_next')}
          </NextBtn>
        </BtnWrapper>
      </Container>
    </Wrapper>
  );
}
