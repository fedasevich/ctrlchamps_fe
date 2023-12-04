import { TFunction } from 'i18next';
import { CaregiverFilterState } from 'src/components/create-appointment-fourth/types';

export const getCaregiverFilterInitialState = (): CaregiverFilterState => ({
  isOpenToSeekerHomeLiving: true,
  isShowAvailableCaregivers: true,
  location: {
    address: '',
    city: '',
    country: '',
    state: '',
    utcOffset: 0,
    zipCode: '',
  },
  services: [
    { label: 'personalCare', checked: false },
    { label: 'medicationManagement', checked: false },
    { label: 'mobilitySupport', checked: false },
    { label: 'mealPreparation', checked: false },
    { label: 'housekeeping', checked: false },
    { label: 'socialActivities', checked: false },
  ],
});

export const serializeCaregiverFilterStateToQueryString = (
  filterState: CaregiverFilterState,
  translate: TFunction<'translation', undefined, 'translation'>
): URLSearchParams => {
  const services = JSON.stringify(
    filterState.services
      .filter((service) => service.checked)
      .map((service) => translate(translate(`createAppointmentFourth.services.${service.label}`)))
  );

  const dataToSerialize = {
    isOpenToSeekerHomeLiving: filterState.isOpenToSeekerHomeLiving,
    isShowAvailableCaregivers: filterState.isShowAvailableCaregivers,
    ...filterState.location,
    utcOffset: filterState.location.utcOffset.toString(),
    services,
  };

  const searchParams = Object.entries(dataToSerialize).reduce((params, [key, value]) => {
    params.append(key, value as string);
    return params;
  }, new URLSearchParams());

  return searchParams;
};

export const getMockCaregiverAvatar = (size: number): string =>
  `https://picsum.photos/${size}/${size}`;
