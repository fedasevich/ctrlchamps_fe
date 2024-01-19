import TuneIcon from '@mui/icons-material/Tune';
import {
  Checkbox,
  FormGroup,
  IconButton,
  Rating,
  Switch,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import CreateAppointmentFourthAutocomplete from 'src/components/create-appointment-fourth/places-autocomplete/CreateAppointmentFourthAutocomplete';
import {
  BaseText,
  FilterContainer,
  RatingWrapper,
  StyledDrawerTrigger,
  StyledFormControlLabel,
  StyledNextButton,
} from 'src/components/create-appointment-fourth/styles';
import Drawer from 'src/components/reusable/drawer/Drawer';
import { DrawerBody, DrawerHeader, DrawerTitle } from 'src/components/reusable/drawer/styles';
import { STARS_NUMBER } from 'src/constants';
import { DrawerItem } from '../reusable/drawer/caregiver-drawer/styles';
import { AutocompletedLocation, CaregiverFilterState } from './types';

interface CreateAppointmentFourthFilterProps {
  caregiverFilter: CaregiverFilterState;
  handleLocationChange: (newLocation: AutocompletedLocation) => void;
  handleSwitchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleServicesChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
}

export default function CreateAppointmentFourthFilter({
  caregiverFilter,
  handleLocationChange,
  handleServicesChange,
  handleSwitchChange,
  onBack,
}: CreateAppointmentFourthFilterProps): JSX.Element {
  const { t: translate } = useTranslation();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('md'));
  const Container = isSmallScreen ? FilterContainer : FilterDrawer;
  const starsArray = Array.from({ length: STARS_NUMBER }, (_, index) => index + 1);

  const handleFilterTriggerClick = (): void => {
    setIsFilterDrawerOpen(true);
  };

  return (
    <>
      <Container {...(isSmallScreen ? {} : { isFilterDrawerOpen, setIsFilterDrawerOpen })}>
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
        <BaseText>{translate('createAppointmentFourth.rating')}</BaseText>
        <FormGroup>
          {starsArray.map((ratingItem) => (
            <RatingWrapper key={ratingItem}>
              <Checkbox name="rating" value={ratingItem} />
              {ratingItem}
              <Rating name="read-only" value={ratingItem} size="small" readOnly />
            </RatingWrapper>
          ))}
        </FormGroup>
        <StyledNextButton variant="outlined" onClick={onBack}>
          {translate('createAppointmentFourth.backToHealthQuestionnaire')}
        </StyledNextButton>
      </Container>
      <StyledDrawerTrigger
        color="primary"
        variant="contained"
        startIcon={<TuneIcon />}
        onClick={handleFilterTriggerClick}
      >
        <Typography>{translate('createAppointmentFourth.filter')}</Typography>
      </StyledDrawerTrigger>
    </>
  );
}

interface DrawerFilterProps {
  children: React.ReactNode;
  isFilterDrawerOpen?: boolean;
  setIsFilterDrawerOpen?: Dispatch<SetStateAction<boolean>>;
}

function FilterDrawer({
  children,
  isFilterDrawerOpen,
  setIsFilterDrawerOpen,
}: DrawerFilterProps): JSX.Element | null {
  const { t: translate } = useTranslation();

  if (!isFilterDrawerOpen || !setIsFilterDrawerOpen) return null;

  const handleDrawerClose = (): void => {
    setIsFilterDrawerOpen(false);
  };

  return (
    <Drawer open={isFilterDrawerOpen} onClose={handleDrawerClose}>
      <DrawerHeader>
        <IconButton size="small" onClick={handleDrawerClose}>
          <ArrowBackFilled />
        </IconButton>
        <DrawerTitle>{translate('createAppointmentFourth.filter')}</DrawerTitle>
      </DrawerHeader>
      <DrawerBody>
        <DrawerItem>{children}</DrawerItem>
      </DrawerBody>
    </Drawer>
  );
}
