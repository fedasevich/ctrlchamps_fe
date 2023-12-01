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
import MonetizationOn from 'src/assets/icons/MonetizationOn';
import RightAction from 'src/assets/icons/RightAction';
import { useLocales } from 'src/locales';
import { appointmentCreationApi } from 'src/redux/api/appointmentCreationAPI';
import CreateAppointmentFourthAutocomplete from './CreateAppointmentFourthAutocomplete/CreateAppointmentFourthAutocomplete';
import CreateAppointmentFourthDrawer from './CreateAppointmentFourthDrawer/CreateAppointmentFourthDrawer';
import { serializeCaregiverFilterStateToQueryString } from './helpers';
import { useCaregiverFilter, useCreateAppointmentFourth } from './hooks';
import {
  Background,
  BaseText,
  CaregiverListContainer,
  FilterContainer,
  StyledAvatar,
  StyledFormControlLabel,
  StyledListItemText,
} from './styles';

export default function CreateAppointmentFourth(): JSX.Element {
  const { translate } = useLocales();

  const { handleDrawerClose, handleDrawerOpen, isDrawerOpen, selectedCaregiverId } =
    useCreateAppointmentFourth();
  const { caregiverFilter, handleLocationChange, handleServicesChange, handleSwitchChange } =
    useCaregiverFilter();

  const [getFilteredCaregivers, { data: filteredCaregivers }] =
    appointmentCreationApi.useLazyGetFilteredCaregiversQuery();

  useEffect(() => {
    if (!caregiverFilter.location.address) return;
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
                  <StyledAvatar
                    src="https://picsum.photos/48/48"
                    alt={`${caregiver.firstName} ${caregiver.lastName}`}
                  />
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
        />
      )}
    </Background>
  );
}
