import { memo, useState } from 'react';
import { useLocales } from 'src/locales';
import WorkForm from 'src/components/complete-profile-second/work-form/WorkForm';
import WorkList from 'src/components/complete-profile-second/work-list/WorkList';
import { ProfileExperience } from 'src/components/complete-profile-second/types';
import { Title } from 'src/components/complete-profile-second/styles';

interface IProps {
  onNext: () => void;
}

function CompleteProfileSecond({ onNext }: IProps): JSX.Element {
  const [workPlaces, setWorkPlaces] = useState<ProfileExperience[]>([]);
  const [editingWorkPlaces, setEditingWorkPlaces] = useState<ProfileExperience | null>(null);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const { translate } = useLocales();

  const onOpenModal = (): void => setIsModalActive(true);

  const onOpenEditModal = (workPlace: ProfileExperience): void => {
    setEditingWorkPlaces(workPlace);
    setIsModalActive(true);
  };

  const onCloseModal = (): void => {
    setEditingWorkPlaces(null);
    setIsModalActive(false);
  };

  const onSaveWorkPlace = (updatedWorkPlace: ProfileExperience): void => {
    const updatedWorkPlaces = workPlaces.map((workPlace) => {
      if (workPlace.id === updatedWorkPlace.id) {
        return { ...workPlace, ...updatedWorkPlace };
      }
      return workPlace;
    });

    setWorkPlaces(updatedWorkPlaces);
    onCloseModal();
  };

  return (
    <>
      <Title>{translate('completeProfileSecond.title')}</Title>
      {!workPlaces.length ? (
        <WorkForm
          workPlaces={workPlaces}
          setWorkPlaces={setWorkPlaces}
          onSave={onSaveWorkPlace}
          onClose={onCloseModal}
          editingWorkPlaces={editingWorkPlaces}
        />
      ) : (
        <WorkList
          workPlaces={workPlaces}
          setWorkPlaces={setWorkPlaces}
          onNext={onNext}
          onClose={onCloseModal}
          onOpen={onOpenModal}
          isModalActive={isModalActive}
          onEdit={onOpenEditModal}
          editingWorkPlaces={editingWorkPlaces}
          onSave={onSaveWorkPlace}
        />
      )}
    </>
  );
}

export default memo(CompleteProfileSecond);
