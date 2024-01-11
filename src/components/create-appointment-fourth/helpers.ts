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
    latLng: '',
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
  translate: (translate: string) => string
): URLSearchParams => {
  const services = filterState.services
    .filter((service) => service.checked)
    .map((service) => translate(translate(`createAppointmentFourth.services.${service.label}`)));

  const dataToSerialize = {
    isOpenToSeekerHomeLiving: filterState.isOpenToSeekerHomeLiving,
    isShowAvailableCaregivers: filterState.isShowAvailableCaregivers,
    ...filterState.location,
    utcOffset: filterState.location.utcOffset.toString(),
  };

  const searchParams = Object.entries(dataToSerialize).reduce((params, [key, value]) => {
    params.append(key, value as string);

    return params;
  }, new URLSearchParams());
  services.forEach((item) => searchParams.append('services', item));

  return searchParams;
};
