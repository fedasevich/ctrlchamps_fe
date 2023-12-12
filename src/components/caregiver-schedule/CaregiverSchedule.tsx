import { CalendarPicker } from '@mui/x-date-pickers';
import { addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import CreateAppointmentIcon from 'src/assets/icons/CreateAppointmentIcon';
import AppointmentDrawer from 'src/components/appointments/appointment-drawer/AppointmentDrawer';
import { useLocales } from 'src/locales';
import { CURRENT_DAY, ONE_DAY } from 'src/constants';
import CaregiverAppointment from './CaregiverAppointment';
import { mocksChosenDay, mokcsNextDay } from './mocks';
import {
  AppointmentsContainer,
  Background,
  CalendarBtn,
  CalendarContainer,
  Container,
  IconBackground,
  MainText,
  NoAppointmentsContainer,
  TextContainer,
} from './styles';
import { CaregiverAppointmentI } from './types';

export default function CaregiverSchedule({
  isCalendarVisible,
}: {
  isCalendarVisible: boolean;
}): JSX.Element {
  const { translate } = useLocales();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [chosenDay, setChosenDay] = useState<Date>(CURRENT_DAY);
  const [nextDay, setNextDay] = useState<Date>(addDays(chosenDay, ONE_DAY));
  const [chosenDayAppointments, setChosenDayAppointments] = useState<CaregiverAppointmentI[]>([]);
  const [nextDayAppointments, setNextDayAppointments] = useState<CaregiverAppointmentI[]>([]);

  const chooseDay = (date: Date | null): void => {
    if (date) {
      setChosenDay(date);
      setNextDay(addDays(date, ONE_DAY));
      setChosenDayAppointments(mocksChosenDay);
      setNextDayAppointments(mokcsNextDay);
    }
  };

  const chooseCurrentDate = (): void => {
    setChosenDay(CURRENT_DAY);
    setNextDay(addDays(CURRENT_DAY, ONE_DAY));
  };

  const openDrawer = (): void => setIsDrawerOpen(true);
  const closeDrawer = (): void => setIsDrawerOpen(false);

  return (
    <Background>
      <Container>
        {isCalendarVisible && (
          <CalendarContainer>
            <CalendarPicker
              className="calendar-picker"
              date={chosenDay}
              onChange={(date): void => chooseDay(date)}
            />
            <CalendarBtn onClick={chooseCurrentDate}>
              {translate('schedule_page.choose_today')}
            </CalendarBtn>
          </CalendarContainer>
        )}

        {!chosenDayAppointments.length ? (
          <NoAppointmentsContainer>
            <IconBackground>
              <CreateAppointmentIcon />
            </IconBackground>
            <TextContainer>
              <MainText>{translate('schedule_page.no_appointments')}</MainText>
            </TextContainer>
          </NoAppointmentsContainer>
        ) : (
          <AppointmentsContainer>
            <AppointmentDrawer
              selectedAppointmentId=""
              isOpen={isDrawerOpen}
              onClose={closeDrawer}
              setIsDrawerOpen={openDrawer}
            />
            <CaregiverAppointment
              appointmentDays={chosenDayAppointments}
              appointmentDay={chosenDay}
              openDrawer={openDrawer}
            />
            {nextDayAppointments.length > 0 && (
              <CaregiverAppointment
                appointmentDays={nextDayAppointments}
                appointmentDay={nextDay}
                openDrawer={openDrawer}
              />
            )}
          </AppointmentsContainer>
        )}
      </Container>
    </Background>
  );
}
