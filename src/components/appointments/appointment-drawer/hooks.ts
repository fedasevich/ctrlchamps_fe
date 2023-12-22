import { useState, Dispatch, SetStateAction } from 'react';
import { useGetAppointmentQuery, DetailedAppointment } from 'src/redux/api/appointmentApi';
import {
  useGetVirtualAssessmentInfoQuery,
  VirtualAssessment,
} from 'src/redux/api/virtualAssessmentApi';
import { getFormattedDate } from '../helpers';

interface IProps {
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  selectedAppointmentId: string;
}

type ReturnType = {
  isCancelModalOpen: boolean;
  isCompleteModalOpen: boolean;
  isAgreementModalOpen: boolean;
  isVirtualAssessmentModalOpen: boolean;
  isVirtualAssessmentSuccessOpen: boolean;
  isTermsAccepted: boolean;
  isLoading: boolean;
  virtualAssessment: VirtualAssessment | undefined;
  appointment: DetailedAppointment | undefined;
  formattedStartDate: string | undefined;
  handleCancelModalOpen: () => void;
  handleCancelModalClose: () => void;
  handleCompleteModalOpen: () => void;
  handleCompleteModalClose: () => void;
  handleAgreementModalOpen: () => void;
  handleAgreementModalClose: () => void;
  handleVirtualAssessmentModalOpen: () => void;
  handleVirtualAssessmentModalClose: () => void;
  handleVirtualAssessmentSuccessModalOpen: () => void;
  handleVirtualAssessmentSuccessModalClose: () => void;
  setIsTermsAccepted: Dispatch<SetStateAction<boolean>>;
  openOriginalAppointment: () => void;
};

export function useAppointmentDrawer({
  setIsDrawerOpen,
  selectedAppointmentId,
}: IProps): ReturnType {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState<boolean>(false);
  const [isVirtualAssessmentModalOpen, setIsVirtualAssessmentModalOpen] = useState<boolean>(false);
  const [isVirtualAssessmentSuccessOpen, setIsVirtualAssessmentSuccessOpen] =
    useState<boolean>(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

  const { data: appointment, isLoading } = useGetAppointmentQuery(selectedAppointmentId);
  const { data: virtualAssessment } = useGetVirtualAssessmentInfoQuery(selectedAppointmentId);

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

  return {
    isCancelModalOpen,
    isCompleteModalOpen,
    isAgreementModalOpen,
    isVirtualAssessmentModalOpen,
    isVirtualAssessmentSuccessOpen,
    isTermsAccepted,
    isLoading,
    virtualAssessment,
    appointment,
    formattedStartDate,
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
  };
}
