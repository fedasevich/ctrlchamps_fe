import {
  Checkbox,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Switch,
} from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MonetizationOn from 'src/assets/icons/MonetizationOn';
import RightAction from 'src/assets/icons/RightAction';
import { SMALL_AVATAR_SIZE } from 'src/constants';
import { serializeCaregiverFilterStateToQueryString } from 'src/components/create-appointment-fourth/helpers';
import {
  useCaregiverFilter,
  useCreateAppointmentFourth,
} from 'src/components/create-appointment-fourth/hooks';
import CreateAppointmentFourthAutocomplete from 'src/components/create-appointment-fourth/places-autocomplete/CreateAppointmentFourthAutocomplete';
import {
  Background,
  BaseText,
  CaregiverListContainer,
  FilterContainer,
  StyledFormControlLabel,
  StyledListItemText,
  StyledNextButton,
} from 'src/components/create-appointment-fourth/styles';
import { appointmentApi } from 'src/redux/api/appointmentApi';
import { useTypedSelector } from 'src/redux/store';
import CreateAppointmentFourthDrawer from './CreateAppointmentFourthDrawer';
import UserAvatar from '../reusable/user-avatar/UserAvatar';

interface CreateAppointmentFourthProps {
  onNext: () => void;
  onBack: () => void;
}

export default function CreateAppointmentFourth({
  onNext,
  onBack,
}: CreateAppointmentFourthProps): JSX.Element {
  const { t: translate } = useTranslation();

  const seekerLocation = useTypedSelector((state) => state.location.location);

  const { handleDrawerClose, handleDrawerOpen, isDrawerOpen, selectedCaregiverId } =
    useCreateAppointmentFourth();
  const { caregiverFilter, handleLocationChange, handleServicesChange, handleSwitchChange } =
    useCaregiverFilter();

  const [getFilteredCaregivers, { data: filteredCaregivers }] =
    appointmentApi.useLazyGetFilteredCaregiversQuery();

  useEffect(() => {
    getFilteredCaregivers(serializeCaregiverFilterStateToQueryString(caregiverFilter, translate));
  }, [caregiverFilter, getFilteredCaregivers, translate]);

  return (
    <Background>
      <FilterContainer>
        <BaseText>{translate('createAppointmentFourth.location')}</BaseText>
        <CreateAppointmentFourthAutocomplete onLocationChange={handleLocationChange} />
        <BaseText>{translate('createAppointmentFourth.availability')}</BaseText>
        <StyledFormControlLabel
          control={
            <Switch
              value={caregiverFilter.isShowAvailableCaregivers}
              checked={caregiverFilter.isShowAvailableCaregivers}
              onChange={handleSwitchChange}
              name="isShowAvailableCaregivers"
            />
          }
          label={translate('createAppointmentFourth.showAvailableCaregivers')}
        />
        <StyledFormControlLabel
          control={
            <Switch
              value={caregiverFilter.isOpenToSeekerHomeLiving}
              checked={caregiverFilter.isOpenToSeekerHomeLiving}
              onChange={handleSwitchChange}
              name="isOpenToSeekerHomeLiving"
            />
          }
          label={translate('createAppointmentFourth.openToLivingInClientsHouses')}
        />
        <BaseText>{translate('createAppointmentFourth.servicesTitle')}</BaseText>
        <FormGroup>
          {caregiverFilter.services.map((service) => (
            <StyledFormControlLabel
              key={service.label}
              control={
                <Checkbox
                  checked={service.checked}
                  onChange={handleServicesChange}
                  name="services"
                  value={service.label}
                />
              }
              label={translate(`createAppointmentFourth.services.${service.label}`)}
            />
          ))}
        </FormGroup>
        <StyledNextButton variant="outlined" onClick={onBack}>
          {translate('createAppointmentFourth.backToHealthQuestionnaire')}
        </StyledNextButton>
      </FilterContainer>
      <CaregiverListContainer>
        <List>
          {!!filteredCaregivers &&
            filteredCaregivers.map((caregiver) => (
              <ListItem
                key={caregiver.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="open-drawer"
                    onClick={(): void => handleDrawerOpen(caregiver.id)}
                  >
                    <RightAction />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <UserAvatar userId={caregiver.id} size={SMALL_AVATAR_SIZE} />
                </ListItemAvatar>

                <StyledListItemText
                  primary={`${caregiver.firstName} ${caregiver.lastName}`}
                  secondary={
                    <>
                      <MonetizationOn />{' '}
                      {translate('createAppointmentFourth.hourRate', {
                        rate: caregiver.hourlyRate,
                      })}
                    </>
                  }
                />
              </ListItem>
            ))}
        </List>
      </CaregiverListContainer>
      {selectedCaregiverId && (
        <CreateAppointmentFourthDrawer
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          selectedCaregiverId={selectedCaregiverId}
          onNext={onNext}
          isSubmitDisabled={!seekerLocation}
        />
      )}
    </Background>
  );
}
