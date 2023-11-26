import { Dispatch, SetStateAction, useState } from 'react';
import { Box, Divider, IconButton, List, ListItem } from '@mui/material';
import { Create, Delete } from '@mui/icons-material';

import WorkForm from 'src/components/complete-profile-second/work-form/WorkForm';
import { ProfileExperience } from 'src/components/complete-profile-second/types';
import Modal from 'src/components/reusable/modal/Modal';
import { useLocales } from 'src/locales';

import { ButtonWrapper, StyledListItemButton, SubTitle, StyledButton, Title } from './styles';

type Props = {
  onClose: () => void;
  onOpen: () => void;
  onNext: () => void;
  onEdit: (workPlace: ProfileExperience) => void;
  onSave: (updatedWorkPlace: ProfileExperience) => void;
  setWorkPlaces: Dispatch<SetStateAction<ProfileExperience[]>>;
  workPlaces: ProfileExperience[];
  isModalActive: boolean;
  editingWorkPlaces: ProfileExperience | null;
};

export default function WorkList({
  isModalActive,
  onClose,
  onOpen,
  workPlaces,
  onNext,
  setWorkPlaces,
  onEdit,
  onSave,
  editingWorkPlaces,
}: Props): JSX.Element {
  const { translate } = useLocales();

  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);
  const [deleteWorkPlaceId, setDeleteWorkPlaceId] = useState<string>('');

  const onDeleteModalClose = (): void => setIsDeleteModalActive(false);
  const onDeleteModalOpen = (): void => setIsDeleteModalActive(true);

  const onSaveWorkPlaceId = (workPlaceId: string): void => {
    onDeleteModalOpen();
    setDeleteWorkPlaceId(workPlaceId);
  };
  const onDeleteWorkPlace = (): void => {
    setWorkPlaces(workPlaces.filter((workPlace) => workPlace.id !== deleteWorkPlaceId));
    onDeleteModalClose();
  };

  return (
    <>
      <SubTitle>{translate('completeProfileSecond.subTitle')}</SubTitle>
      <List disablePadding>
        {workPlaces.map((workPlace) => (
          <ListItem
            key={workPlace.id}
            secondaryAction={
              <>
                <IconButton edge="end" color="primary" onClick={(): void => onEdit(workPlace)}>
                  <Create />
                </IconButton>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={(): void => onSaveWorkPlaceId(workPlace.id)}
                >
                  <Delete />
                </IconButton>
              </>
            }
            disablePadding
          >
            <StyledListItemButton disableGutters>{workPlace.workPlace}</StyledListItemButton>
          </ListItem>
        ))}
      </List>

      <ButtonWrapper>
        <Divider />
        <StyledButton variant="outlined" onClick={onOpen}>
          {translate('completeProfileSecond.addWorkPlace')}
        </StyledButton>

        <StyledButton variant="contained" onClick={onNext}>
          {translate('completeProfileSecond.next')}
        </StyledButton>
      </ButtonWrapper>

      <Modal
        title={translate('completeProfileSecond.editWorkPlace')}
        onClose={onClose}
        isActive={isModalActive}
      >
        <WorkForm
          editingWorkPlaces={editingWorkPlaces}
          onSave={onSave}
          onClose={onClose}
          workPlaces={workPlaces}
          setWorkPlaces={setWorkPlaces}
        />
      </Modal>

      <Modal
        isActive={isDeleteModalActive}
        onClose={onDeleteModalClose}
        title={translate('completeProfileSecond.deleteWorkPlace')}
      >
        <Box display="flex" flexDirection="column">
          <Title>{translate('completeProfileSecond.deleteWarning')}</Title>
          <Box display="flex" gap={2}>
            <StyledButton variant="contained" onClick={onDeleteModalClose}>
              {translate('completeProfileSecond.return')}
            </StyledButton>
            <StyledButton variant="contained" color="error" onClick={onDeleteWorkPlace}>
              {translate('completeProfileSecond.delete')}
            </StyledButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
