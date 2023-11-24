import { Dispatch, SetStateAction, useState } from 'react';
import { Box, Divider, IconButton, List, ListItem } from '@mui/material';
import { Create, Delete } from '@mui/icons-material';

import CertificateForm from 'src/components/profile/profile-qualification/certificate-form/CertificateForm';
import {
  ButtonWrapper,
  StyledListItemButton,
  SubTitle,
  StyledButton,
  Title,
} from 'src/components/profile/profile-qualification/certificate-list/styles';
import { ProfileQuality } from 'src/components/profile/profile-qualification/types';
import Modal from 'src/components/reusable/modal/Modal';
import { useLocales } from 'src/locales';

type Props = {
  onClose: () => void;
  onOpen: () => void;
  onNext: () => void;
  onEdit: (certificate: ProfileQuality) => void;
  onSave: (updatedCertificate: ProfileQuality) => void;
  setCertificates: Dispatch<SetStateAction<ProfileQuality[]>>;
  certificates: ProfileQuality[];
  isModalActive: boolean;
  editingCertificate: ProfileQuality | null;
};

export default function CertificateList({
  isModalActive,
  onClose,
  onOpen,
  certificates,
  onNext,
  setCertificates,
  onEdit,
  onSave,
  editingCertificate,
}: Props): JSX.Element {
  const { translate } = useLocales();

  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);
  const [deleteCertificateId, setDeleteCertificateId] = useState<string>('');

  const onDeleteModalClose = (): void => setIsDeleteModalActive(false);
  const onDeleteModalOpen = (): void => setIsDeleteModalActive(true);

  const onSaveCertificateId = (certificateId: string): void => {
    onDeleteModalOpen();
    setDeleteCertificateId(certificateId);
  };
  const onDeleteCertificate = (): void => {
    setCertificates(certificates.filter((certificate) => certificate.id !== deleteCertificateId));
    onDeleteModalClose();
  };

  return (
    <>
      <SubTitle>{translate('profileQualification.subTitle')}</SubTitle>
      <List disablePadding>
        {certificates.map((certificate) => (
          <ListItem
            key={certificate.id}
            secondaryAction={
              <>
                <IconButton edge="end" color="primary" onClick={(): void => onEdit(certificate)}>
                  <Create />
                </IconButton>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={(): void => onSaveCertificateId(certificate.id)}
                >
                  <Delete />
                </IconButton>
              </>
            }
            disablePadding
          >
            <StyledListItemButton disableGutters>
              {certificate.certificationName}
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>

      <ButtonWrapper>
        <Divider />
        <StyledButton variant="outlined" onClick={onOpen}>
          {translate('profileQualification.addCertificate')}
        </StyledButton>

        <StyledButton variant="contained" onClick={onNext}>
          {translate('profileQualification.next')}
        </StyledButton>
      </ButtonWrapper>

      <Modal
        title={translate('profileQualification.editQualification')}
        onClose={onClose}
        isActive={isModalActive}
      >
        <CertificateForm
          editingCertificate={editingCertificate}
          onSave={onSave}
          onClose={onClose}
          certificates={certificates}
          setCertificates={setCertificates}
        />
      </Modal>

      <Modal
        isActive={isDeleteModalActive}
        onClose={onDeleteModalClose}
        title={translate('profileQualification.deleteCertificate')}
      >
        <Box display="flex" flexDirection="column">
          <Title>{translate('profileQualification.deleteWarning')}</Title>

          <Box display="flex" gap={2}>
            <StyledButton variant="contained" onClick={onDeleteModalClose}>
              {translate('profileQualification.return')}
            </StyledButton>

            <StyledButton variant="contained" color="error" onClick={onDeleteCertificate}>
              {translate('profileQualification.delete')}
            </StyledButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
