import { useState } from 'react';
import { Title } from 'src/components/profile/profile-qualification/certificate-form/styles';
import { ProfileQuality } from 'src/components/profile/profile-qualification/types';
import { useLocales } from 'src/locales';
import CertificateList from 'src/components/profile/profile-qualification/certificate-list/CertificateList';
import CertificateForm from 'src/components/profile/profile-qualification/certificate-form/CertificateForm';

type Props = {
  onNext: () => void;
};

export default function ProfileQualification({ onNext }: Props): JSX.Element {
  const [certificates, setCertificates] = useState<ProfileQuality[]>([]);
  const [editingCertificate, setEditingCertificate] = useState<ProfileQuality | null>(null);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const { translate } = useLocales();

  const onOpenModal = (): void => setIsModalActive(true);

  const onOpenEditModal = (certificate: ProfileQuality): void => {
    setEditingCertificate(certificate);
    setIsModalActive(true);
  };

  const onCloseModal = (): void => {
    setEditingCertificate(null);
    setIsModalActive(false);
  };

  const onSaveCertificate = (updatedCertificate: ProfileQuality): void => {
    const updatedCertificates = certificates.map((certificate) => {
      if (certificate.id === updatedCertificate.id) {
        return { ...certificate, ...updatedCertificate };
      }
      return certificate;
    });

    setCertificates(updatedCertificates);
    onCloseModal();
  };
  
  return (
    <>
      <Title>{translate('profileQualification.mainTitle')}</Title>
      {!certificates.length ? (
        <CertificateForm
          certificates={certificates}
          setCertificates={setCertificates}
          onSave={onSaveCertificate}
          onClose={onCloseModal}
          editingCertificate={editingCertificate}
        />
      ) : (
        <CertificateList
          certificates={certificates}
          setCertificates={setCertificates}
          onNext={onNext}
          onClose={onCloseModal}
          onOpen={onOpenModal}
          isModalActive={isModalActive}
          onEdit={onOpenEditModal}
          editingCertificate={editingCertificate}
          onSave={onSaveCertificate}
        />
      )}
    </>
  );
}
