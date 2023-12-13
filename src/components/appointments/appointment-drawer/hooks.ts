import { useState, Dispatch, SetStateAction } from 'react';
import { useGetAppointmentQuery } from 'src/redux/api/appointmentApi';
import { getFormattedDate } from '../helpers';
import { DetailedAppointment } from '../types';

interface IProps {
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  selectedAppointmentId: string;
}

type ReturnType = {
  isCancelModalOpen: boolean;
  isCompleteModalOpen: boolean;
  isAgreementModalOpen: boolean;
  isTermsAccepted: boolean;
  isLoading: boolean;
  isVirtualAssessmentAccepted: boolean;
  isVirtualAssessmentDone: boolean;
  appointment: DetailedAppointment | undefined;
  formattedStartDate: string | undefined;
  handleCancelModalOpen: () => void;
  handleCancelModalClose: () => void;
  handleCompleteModalOpen: () => void;
  handleCompleteModalClose: () => void;
  handleAgreementModalOpen: () => void;
  handleAgreementModalClose: () => void;
  setIsTermsAccepted: Dispatch<SetStateAction<boolean>>;
};

export function useAppointmentDrawer({
  setIsDrawerOpen,
  selectedAppointmentId,
}: IProps): ReturnType {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState<boolean>(false);
  const [isVirtualAssessmentDone, setVirtualAssessmentDone] = useState<boolean>(true);
  const [isVirtualAssessmentAccepted, setIsVirtualAssessmentAccepted] = useState<boolean>(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

  const { data: appointment, isLoading } = useGetAppointmentQuery(selectedAppointmentId);

  const formattedStartDate = appointment && getFormattedDate(appointment.startDate);

  const handleCancelModalOpen = (): void => {
    setIsCancelModalOpen(true);
    setIsCompleteModalOpen(false);
    setIsDrawerOpen(false);
  };
  const handleCancelModalClose = (): void => {
    setIsCancelModalOpen(false);
    setIsDrawerOpen(true);
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

  return {
    isCancelModalOpen,
    isCompleteModalOpen,
    isAgreementModalOpen,
    isTermsAccepted,
    isLoading,
    isVirtualAssessmentAccepted,
    isVirtualAssessmentDone,
    appointment,
    formattedStartDate,
    handleCancelModalOpen,
    handleCancelModalClose,
    handleCompleteModalOpen,
    handleCompleteModalClose,
    handleAgreementModalOpen,
    handleAgreementModalClose,
    setIsTermsAccepted,
  };
}
