import { Fragment, useState } from 'react';

import {
  Background,
  MainTitle,
  Wrapper,
  SectionItem,
  Video,
} from 'src/components/caregiver-info/styles';
import { useLocales } from 'src/locales';
import { Caregiver } from 'src/types/Caregiver.type';
import Modal from 'src/components/reusable/modal/Modal';
import ProfileQualification from 'src/components/profile/profile-qualification/ProfileQualification';
import CompleteProfileSecond from 'src/components/complete-profile-second/CompleteProfileSecond';
import CompleteProfileThird from 'src/components/complete-profile-third/CompleteProfileThird';
import CompleteProfileFourth from 'src/components/complete-profile-fourth/CompleteProfileFourth';
import CompleteProfileFifth from 'src/components/complete-profile-fifth/CompleteProfileFifth';
import { Bio } from 'src/components/profile/bio/Bio';
import { FIRST_STEP_INDEX, SECOND_STEP_INDEX } from 'src/constants';
import { ProfileWrapper } from 'src/components/reusable/profile-wrapper/ProfileWrapper';
import CaregiverInfoSection from 'src/components/caregiver-info/caregiver-info-section/CaregiverInfoSection';

type Props = {
  caregiverInfo: Caregiver;
  refetchCaregiverInfo: () => void;
};

export default function CaregiverInfo({ caregiverInfo, refetchCaregiverInfo }: Props): JSX.Element {
  const { translate } = useLocales();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(FIRST_STEP_INDEX);
  const [isStepModalOpen, setIsStepModalOpen] = useState<boolean>(false);

  const handleNext = (): void => setActiveStepIndex(activeStepIndex + SECOND_STEP_INDEX);
  const handleBack = (): void => setActiveStepIndex(activeStepIndex - SECOND_STEP_INDEX);

  const STEPS = [
    {
      label: translate('profile.qualification'),
      component: <ProfileQualification onNext={handleNext} />,
    },
    {
      label: translate('profile.workExperience'),
      component: <CompleteProfileSecond onNext={handleNext} onBack={handleBack} />,
    },
    {
      label: translate('profile.services'),
      component: <CompleteProfileThird onNext={handleNext} onBack={handleBack} />,
    },
    {
      label: translate('profile.availability'),
      component: <CompleteProfileFourth onNext={handleNext} onBack={handleBack} />,
    },
    {
      label: translate('profile.rates'),
      component: <CompleteProfileFifth onNext={handleNext} onBack={handleBack} />,
    },
    {
      label: translate('profile.bio'),
      component: <Bio onBack={handleBack} />,
    },
  ];

  const CAREGIVER_INFO_SECTIONS = [
    {
      title: 'caregiverProfile.qualification',
      content: caregiverInfo.qualifications.map((qualification) => (
        <SectionItem key={qualification.id}>{qualification.name}</SectionItem>
      )),
    },
    {
      title: 'caregiverProfile.workExperience',
      content: caregiverInfo.workExperiences.map((workExperience) => (
        <SectionItem key={workExperience.id}>{workExperience.workplace}</SectionItem>
      )),
    },
    {
      title: 'caregiverProfile.skills',
      content: caregiverInfo.caregiverInfo.services.map((service) => (
        <SectionItem key={service}>{service}</SectionItem>
      )),
    },
    {
      title: 'caregiverProfile.availability',
      content: caregiverInfo.caregiverInfo.availability.map((availability) => (
        <Fragment key={availability.day}>
          <SectionItem>{availability.day}</SectionItem>
          <SectionItem>
            {availability.startTime} &#8212; {availability.endTime}
          </SectionItem>
        </Fragment>
      )),
    },
    {
      title: 'caregiverProfile.rate',
      content: (
        <SectionItem>
          &#36;{caregiverInfo.caregiverInfo.hourlyRate}/{translate('caregiverProfile.perHour')}
        </SectionItem>
      ),
    },
    {
      title: 'caregiverProfile.bio',
      content: (
        <>
          <SectionItem>{caregiverInfo.caregiverInfo.description}</SectionItem>
          <Video src={caregiverInfo.caregiverInfo.videoLink} />
        </>
      ),
    },
  ];

  const ActiveStepComponent = STEPS[activeStepIndex].component;
  const ActiveStepLabel = STEPS[activeStepIndex].label;

  const handleModalOpen = (stepIndex?: number): void => {
    if (stepIndex !== undefined) {
      setActiveStepIndex(stepIndex);
    }

    setIsStepModalOpen(true);
  };

  const handleModalClose = (): void => {
    refetchCaregiverInfo();
    setIsStepModalOpen(false);
  };

  return (
    <Background>
      <Wrapper>
        <MainTitle>{translate('caregiverProfile.title')}</MainTitle>

        {CAREGIVER_INFO_SECTIONS.map((section, index) => (
          <CaregiverInfoSection
            key={section.title}
            onClick={(): void => handleModalOpen(index)}
            title={translate(section.title)}
          >
            {section.content}
          </CaregiverInfoSection>
        ))}

        <Modal
          onClose={handleModalClose}
          title={ActiveStepLabel}
          isActive={isStepModalOpen}
          increaseHeight
        >
          <ProfileWrapper>{ActiveStepComponent}</ProfileWrapper>
        </Modal>
      </Wrapper>
    </Background>
  );
}
