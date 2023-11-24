import { Create, Delete } from '@mui/icons-material';
import { Divider, IconButton, List, ListItem } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import CertificateForm from 'src/components/profile/profile-qualification/certificate-form/CertificateForm';
import {
  ButtonWrapper,
  StyledListItemButton,
  SubTitle,
  StyledButton,
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

  return (
    <>
      <SubTitle>{translate('profileQualification.subTitle')}</SubTitle>
      <List sx={{ width: '100%', maxWidth: 405 }} disablePadding>
        {certificates.map((certificate) => (
          <ListItem
            key={certificate.id}
            secondaryAction={
              <>
                <IconButton edge="end" color="primary" onClick={(): void => onEdit(certificate)}>
                  <Create />
                </IconButton>
                <IconButton edge="end" color="error">
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

      <Modal title="Edit Qualification" onClose={onClose} isActive={isModalActive}>
        <CertificateForm
          editingCertificate={editingCertificate}
          onSave={onSave}
          onClose={onClose}
          certificates={certificates}
          setCertificates={setCertificates}
        />
      </Modal>
    </>
  );
}
