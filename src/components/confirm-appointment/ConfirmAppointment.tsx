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
import { Appointment } from '../create-appointment/enums';

export default function ConfirmAppointment({ onBack }: { onBack: () => void }): JSX.Element {
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
    onBack();
  };

  const confirmAppointment = async (): Promise<void> => {
    try {
      await createAppointment({
        caregiverInfoId: caregiver?.caregiverInfo.id,
        name: appointment.appointmentName,
        type: appointment.appointmentType,
        status: 'Pending confirmation',
        details: details || undefined,
        location: 'Location Address',
        diagnosisNote: healthQuestionnaire.notes.DIAGNOSIS,
        activityNote: healthQuestionnaire.notes.ACTIVITIES,
        capabilityNote: healthQuestionnaire.notes.CAPABILITIES,
        startDate:
          appointment.appointmentType === Appointment.oneTime
            ? appointment.oneTimeDate.startTime
            : appointment.recurringDate.startDate,
        endDate:
          appointment.appointmentType === Appointment.oneTime
            ? appointment.oneTimeDate.endTime
            : appointment.recurringDate.endDate,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        weekdays:
          appointment.appointmentType !== Appointment.oneTime
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
