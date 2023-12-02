import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import ArrowForward from 'src/assets/icons/ArrowForward';
import { useLocales } from 'src/locales';
import { useTypedSelector } from 'src/redux/store';
import TasksList from './TasksList';
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

  const [tasks, setTasks] = useState<string[]>([]);
  const [details, setDetails] = useState<string>('');
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const onOpenModal = (): void => setIsModalActive(true);
  const onCloseModal = (): void => setIsModalActive(false);

  const deleteTask = (idx: number): void => {
    const filtered = tasks.filter((el, i) => i !== idx);
    setTasks(filtered);
  };

  const goToProfileStep = (): void => {
    // go to 4th step
  };

  const confirmAppointment = (): void => {
    // confirm appointment
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
