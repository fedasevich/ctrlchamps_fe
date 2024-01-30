import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { USER_ROLE } from 'src/constants';
import { DetailedAppointment, useGetAppointmentQuery } from 'src/redux/api/appointmentApi';
import { formatTimeToTimezone } from 'src/utils/formatTime';
import { parseISO, setDate, setMonth } from 'date-fns';
import { DRAWER_DATE_FORMAT_WITH_TIMEZONE } from '../constants';

interface IProps {
  role: string;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  selectedAppointmentId: string;
  chosenDay?: Date;
}

type ReturnType = {
  isCancelModalOpen: boolean;
  isCompleteModalOpen: boolean;
  isAgreementModalOpen: boolean;
  isActivityLogModalOpen: boolean;
  isReviewActivityLogModalOpen: boolean;
  isVirtualAssessmentModalOpen: boolean;
  isVirtualAssessmentSuccessOpen: boolean;
  isTermsAccepted: boolean;
  isLoading: boolean;
  appointment: DetailedAppointment | undefined;
  actualAppointmentDate: string | undefined;
  handleCancelModalOpen: () => void;
  handleCancelModalClose: () => void;
  handleCompleteModalOpen: () => void;
  handleCompleteModalClose: () => void;
  handleAgreementModalOpen: () => void;
  handleAgreementModalClose: () => void;
  handleVirtualAssessmentModalOpen: () => void;
  handleVirtualAssessmentModalClose: () => void;
  handleActivityLogModalOpen: () => void;
  handleActivityLogModalClose: () => void;
  handleReviewActivityLogModalOpen: () => void;
  handleReviewActivityLogModalClose: () => void;
  handleVirtualAssessmentSuccessModalOpen: () => void;
  handleVirtualAssessmentSuccessModalClose: () => void;
  setIsTermsAccepted: Dispatch<SetStateAction<boolean>>;
  openOriginalAppointment: () => void;
  closeOriginalAppointment: () => void;
  virtualAssessmentDrawerShown: boolean;
};

export function useAppointmentDrawer({
  role,
  setIsDrawerOpen,
  selectedAppointmentId,
  chosenDay,
}: IProps): ReturnType {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState<boolean>(false);
  const [isActivityLogModalOpen, setIsActivityLogModalOpen] = useState<boolean>(false);
  const [isReviewActivityLogModalOpen, setIsReviewActivityLogModalOpen] = useState<boolean>(false);
  const [isVirtualAssessmentModalOpen, setIsVirtualAssessmentModalOpen] = useState<boolean>(false);
  const [isVirtualAssessmentSuccessOpen, setIsVirtualAssessmentSuccessOpen] =
    useState<boolean>(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

  const { data: appointment, isLoading } = useGetAppointmentQuery(selectedAppointmentId);

  const [actualAppointmentDate, setActualAppointmentDate] = useState<string | undefined>(
    appointment?.startDate
  );

  useEffect(() => {
    if (!chosenDay || !appointment || !appointment.startDate || !appointment.timezone) {
      return;
    }

    const parsedStartDate = parseISO(appointment.startDate);
    const updatedStartDate = setDate(
      setMonth(parsedStartDate, chosenDay.getMonth()),
      chosenDay.getDate()
    );
    const startDate = updatedStartDate.toISOString();

    const formattedStartDate = formatTimeToTimezone(
      startDate,
      appointment.timezone,
      DRAWER_DATE_FORMAT_WITH_TIMEZONE
    );

    setActualAppointmentDate(formattedStartDate);
  }, [chosenDay, appointment]);

  const virtualAssessmentDrawerShown =
    appointment?.virtualAssessment?.wasRescheduled || role === USER_ROLE.Caregiver;

  const handleCancelModalOpen = (): void => {
    setIsCancelModalOpen(true);
    setIsCompleteModalOpen(false);
    setIsDrawerOpen(false);
  };
  const handleCancelModalClose = (): void => {
    setIsCancelModalOpen(false);
    setIsDrawerOpen(false);
  };

  const handleCompleteModalOpen = (): void => {
    setIsCompleteModalOpen(true);
    setIsDrawerOpen(false);
  };

  const handleCompleteModalClose = (): void => {
    setIsCompleteModalOpen(false);
    setIsDrawerOpen(true);
  };

  const handleAgreementModalOpen = (): void => {
    setIsCompleteModalOpen(false);
    setIsAgreementModalOpen(true);
    setIsDrawerOpen(false);
  };
  const handleAgreementModalClose = (): void => {
    setIsAgreementModalOpen(false);
    setIsDrawerOpen(false);
  };

  const handleActivityLogModalOpen = (): void => {
    setIsActivityLogModalOpen(true);
    setIsDrawerOpen(false);
  };
  const handleActivityLogModalClose = (): void => {
    setIsActivityLogModalOpen(false);
  };

  const handleReviewActivityLogModalOpen = (): void => {
    setIsReviewActivityLogModalOpen(true);
    setIsDrawerOpen(false);
  };
  const handleReviewActivityLogModalClose = (): void => {
    setIsReviewActivityLogModalOpen(false);
  };

  const handleVirtualAssessmentModalOpen = (): void => {
    setIsVirtualAssessmentModalOpen(true);
    setIsDrawerOpen(false);
  };
  const handleVirtualAssessmentModalClose = (): void => {
    setIsVirtualAssessmentModalOpen(false);
    setIsDrawerOpen(false);
  };

  const handleVirtualAssessmentSuccessModalOpen = (): void => {
    setIsVirtualAssessmentSuccessOpen(true);
    handleVirtualAssessmentModalClose();
  };

  const handleVirtualAssessmentSuccessModalClose = (): void => {
    setIsVirtualAssessmentSuccessOpen(false);
  };

  const openOriginalAppointment = (): void => {
    setIsDrawerOpen(true);
    setIsVirtualAssessmentModalOpen(false);
  };

  const closeOriginalAppointment = (): void => {
    setIsDrawerOpen(false);
    setIsVirtualAssessmentModalOpen(false);
  };

  return {
    isCancelModalOpen,
    isCompleteModalOpen,
    isAgreementModalOpen,
    isActivityLogModalOpen,
    isReviewActivityLogModalOpen,
    isVirtualAssessmentModalOpen,
    isVirtualAssessmentSuccessOpen,
    isTermsAccepted,
    isLoading,
    appointment,
    actualAppointmentDate,
    handleActivityLogModalOpen,
    handleActivityLogModalClose,
    handleReviewActivityLogModalOpen,
    handleReviewActivityLogModalClose,
    handleCancelModalOpen,
    handleCancelModalClose,
    handleCompleteModalOpen,
    handleCompleteModalClose,
    handleAgreementModalOpen,
    handleAgreementModalClose,
    handleVirtualAssessmentModalOpen,
    handleVirtualAssessmentModalClose,
    handleVirtualAssessmentSuccessModalOpen,
    handleVirtualAssessmentSuccessModalClose,
    setIsTermsAccepted,
    openOriginalAppointment,
    closeOriginalAppointment,
    virtualAssessmentDrawerShown,
  };
}
