import React from 'react';
import { Avatar, Button, Grid, List, ListItem, ListItemText } from '@mui/material';
import { useLocales } from 'src/locales';
import CheckCircle from 'src/assets/icons/CheckCircle';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import { FilledButton } from 'src/components/reusable';
import { ChildModal } from 'src/components/appointment-request-modal/HealthQuestionnaireModal';
import {
  AppointmentModal,
  AppointmentModalBlock,
  AppointmentModalBlockParagraph,
  AppointmentParagraph,
  DrawerBody,
  HealthQuestionnaireBlock,
  InlineBlock,
  ListItemStyled,
  NameParagraph,
  StatusParagraph,
} from './styles';

type appointmentProps = {
  name: string;
  status: string;
  seeker: string;
  appointmentDate: string;
  appointmentTime: string;
  health_questionnaire: { diagnoses: string[]; activity: string[]; env: string[] };
  tasks: string[];
  details: string;
  notes: string[];
};

type AppointmentRequestModalProps = {
  appointment: appointmentProps;
  isOpen: boolean;
  switchModalVisibility: () => void;
};

const AppointmentRequestModal = ({
  appointment,
  isOpen,
  switchModalVisibility,
}: AppointmentRequestModalProps): JSX.Element => {
  const { translate } = useLocales();

  return (
    <AppointmentModal open={isOpen} onClose={switchModalVisibility} anchor="right">
      <DrawerBody>
        <FlowHeader
          text={translate('request_appointment.appointment')}
          iconType="close"
          infoButton
          callback={switchModalVisibility}
        />

        <AppointmentModalBlock>
          <AppointmentParagraph>{appointment.name}</AppointmentParagraph>

          <StatusParagraph>{appointment.status}</StatusParagraph>
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.client')}
          </AppointmentModalBlockParagraph>
          <InlineBlock>
            <Avatar />
            <NameParagraph>{appointment.seeker}</NameParagraph>
          </InlineBlock>
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.date_and_time')}
          </AppointmentModalBlockParagraph>
          {appointment.appointmentDate}, {appointment.appointmentTime}
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.health_questionnaire')}
          </AppointmentModalBlockParagraph>
          <HealthQuestionnaireBlock>
            {Object.keys(appointment.health_questionnaire).map((item, index) => {
              if (item === 'diagnoses' || item === 'activity' || item === 'env') {
                return (
                  <Grid container key={index} sx={{ padding: '5px 0', alignItems: 'center' }}>
                    <Grid item xs={2}>
                      <CheckCircle />
                    </Grid>
                    <Grid item xs={8}>
                      {translate(`health_questionnaire.${item}`)}
                    </Grid>
                    <Grid item xs={2}>
                      <ChildModal
                        name={item}
                        list={
                          appointment.health_questionnaire[
                            item as keyof typeof appointment.health_questionnaire
                          ]
                        }
                        note={appointment.notes[index]}
                      />
                    </Grid>
                  </Grid>
                );
              }
              return null;
            })}
          </HealthQuestionnaireBlock>
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.tasks')}
          </AppointmentModalBlockParagraph>
          <List>
            {appointment.tasks.map((value) => (
              <ListItemStyled key={value} disableGutters>
                <ListItemText primary={value} />
              </ListItemStyled>
            ))}
          </List>
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.additional_details')}
          </AppointmentModalBlockParagraph>
          {appointment.details}
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <InlineBlock>
            <Button variant="outlined" color="error" fullWidth>
              {translate('request_appointment.btns.reject')}
            </Button>
            <FilledButton fullWidth>{translate('request_appointment.btns.accept')}</FilledButton>
          </InlineBlock>
        </AppointmentModalBlock>
      </DrawerBody>
    </AppointmentModal>
  );
};

export default AppointmentRequestModal;
