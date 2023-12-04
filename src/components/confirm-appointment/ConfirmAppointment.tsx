import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import ArrowForward from 'src/assets/icons/ArrowForward';
import { useLocales } from 'src/locales';
import { useTypedSelector } from 'src/redux/store';
import { useCreateAppointmentMutation } from 'src/redux/api/appointmentApi';
import TasksList from 'src/components/confirm-appointment/TasksList';
import {
  Container,
  Header,
  IconWrapper,
  InnerContainer,
  LinkToProfile,
  Name,
  PageBackground,
  Task,
  TasksWrapper,
  Typography,
} from './style';

export default function ConfirmAppointment(): JSX.Element {
  const { translate } = useLocales();
  const caregiver = useTypedSelector((state) => state.caregiver.selectedCaregiver);
  const appointment = useTypedSelector((state) => state.appointment);
  const healthQuestionnaire = useTypedSelector((state) => state.healthQuestionnaire);

  const [tasks, setTasks] = useState<string[]>([]);
  const [details, setDetails] = useState<string>('');
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [createAppointment] = useCreateAppointmentMutation();

  const onOpenModal = (): void => setIsModalActive(true);
  const onCloseModal = (): void => setIsModalActive(false);

  const deleteTask = (idx: number): void => {
    const filtered = tasks.filter((el, i) => i !== idx);
    setTasks(filtered);
  };

  const goToProfileStep = (): void => {
    // go to 4th step
  };

  const confirmAppointment = async (): Promise<void> => {
    try {
      await createAppointment({
        // У нас не подключен 4й степ, там и происходит выбор caregiver'а, для проверки работы запроса ставим свой caregiverId
        caregiverInfoId: String(caregiver?.caregiverInfo.id),
        name: appointment.appointmentName,
        type: appointment.appointmentType,
        status: 'Pending confirmation',
        details: details || undefined,
        location: 'Location Address',
        diagnosisNote: healthQuestionnaire.notes.STEP_1,
        activityNote: healthQuestionnaire.notes.STEP_2,
        capabilityNote: healthQuestionnaire.notes.STEP_3,
        startDate:
          appointment.appointmentType === 'One time'
            ? appointment.oneTimeDate.startTime
            : appointment.recurringDate.startDate,
        endDate:
          appointment.appointmentType === 'One time'
            ? appointment.oneTimeDate.endTime
            : appointment.recurringDate.endDate,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        weekdays:
          appointment.appointmentType !== 'One time'
            ? appointment.recurringDate.weekDays
            : undefined,
        seekerTasks: tasks || undefined,
        seekerCapabilities: healthQuestionnaire.selectedEnvChallenges,
        seekerDiagnoses: healthQuestionnaire.selectedDiagnoses,
        seekerActivities: healthQuestionnaire.selectedActivities,
      }).unwrap();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <PageBackground>
      <Container>
        <InnerContainer>
          <Header>
            <Typography>{translate('confirm_appointment.caregiver')}</Typography>
            <LinkToProfile onClick={goToProfileStep}>
              <Avatar />
              <Name>{`${caregiver?.firstName} ${caregiver?.lastName}`}</Name>
              <ArrowForward />
            </LinkToProfile>
          </Header>
          <TasksWrapper>
            <Typography>{translate('confirm_appointment.tasks')}</Typography>
            {tasks.length > 0 &&
              tasks.map((task, idx) => (
                <Task key={task}>
                  {task}
                  <IconWrapper>
                    <CloseIcon onClick={(): void => deleteTask(idx)} />
                  </IconWrapper>
                </Task>
              ))}
            <TasksList
              tasks={tasks}
              setTasks={setTasks}
              details={details}
              setDetails={setDetails}
              onClose={onCloseModal}
              onOpen={onOpenModal}
              onNext={confirmAppointment}
              isModalActive={isModalActive}
            />
          </TasksWrapper>
        </InnerContainer>
      </Container>
    </PageBackground>
  );
}
