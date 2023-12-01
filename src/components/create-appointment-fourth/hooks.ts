import { ChangeEvent, useState } from 'react';
import { getCaregiverFilterInitialState } from './helpers';
import { AutocompletedLocation, CaregiverFilterState } from './types';

type CaregiverFilterReturnType = {
  caregiverFilter: CaregiverFilterState;
  handleSwitchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleServicesChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLocationChange: (newLocation: AutocompletedLocation) => void;
};

export function useCaregiverFilter(): CaregiverFilterReturnType {
  const [caregiverFilter, setCaregiverFilter] = useState<CaregiverFilterState>(
    getCaregiverFilterInitialState()
  );

  const handleServicesChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = event.target;

    setCaregiverFilter((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        value === service.label ? { ...service, checked } : service
      ),
    }));
  };

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    setCaregiverFilter((prev) => ({ ...prev, [name]: checked }));
  };

  const handleLocationChange = (newLocation: AutocompletedLocation): void => {
    setCaregiverFilter((prev) => ({ ...prev, location: newLocation }));
  };

  return {
    caregiverFilter,
    handleSwitchChange,
    handleServicesChange,
    handleLocationChange,
  };
}

type CreateAppointmentFourthReturnType = {
  isDrawerOpen: boolean;
  handleDrawerOpen: (caregiverId: string) => void;
  handleDrawerClose: () => void;
  selectedCaregiverId: string | null;
};

export function useCreateAppointmentFourth(): CreateAppointmentFourthReturnType {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);

  const handleDrawerOpen = (caregiverId: string): void => {
    setIsDrawerOpen(true);
    setSelectedCaregiverId(caregiverId);
  };
  const handleDrawerClose = (): void => setIsDrawerOpen(false);

  return {
    isDrawerOpen,
    handleDrawerClose,
    handleDrawerOpen,
    selectedCaregiverId,
  };
}
