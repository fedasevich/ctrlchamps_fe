import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Modal, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import { useLocales } from 'src/locales';
import { SECONDARY } from 'src/theme/colors';

import {
  HealthQuestionnaireBlock,
  HealthQuestionnaireModal,
  ModalBlock,
  ListItemTextStyled,
  ListItemStyled,
} from './styles';

type ChildModalProps = {
  name: string;
  note: string;
  list: string[];
};

export function ChildModal({ name, note, list }: ChildModalProps): JSX.Element {
  const { translate } = useLocales();
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        {translate('request_appointment.btns.view')}
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="child-modal-title">
        <HealthQuestionnaireModal>
          <FlowHeader
            text={translate(`health_questionnaire.${name}`)}
            iconType="close"
            callback={handleClose}
          />
          <ModalBlock>
            <List>
              {list.map((value) => (
                <ListItemStyled key={value} disableGutters>
                  <CheckBoxIcon fontSize="medium" color="primary" />
                  <ListItemTextStyled primary={value} />
                </ListItemStyled>
              ))}
            </List>
            {note && (
              <HealthQuestionnaireBlock>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label={translate('health_questionnaire.note')}
                  variant="standard"
                  size="small"
                  value={note}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </HealthQuestionnaireBlock>
            )}
          </ModalBlock>
        </HealthQuestionnaireModal>
      </Modal>
    </>
  );
}
