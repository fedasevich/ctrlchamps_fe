import { TabContext } from '@mui/lab';
import { Box, IconButton, Stack } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import FreeCancellation from 'src/assets/icons/FreeCancellation';
import MonetizationOn from 'src/assets/icons/MonetizationOn';
import { BIG_CAREGIVER_AVATAR_SIZE } from 'src/components/create-appointment-fourth/constants';
import {
  formatWorkExperienceDateRange,
  formatWorkExperienceDateRangeTenure,
  getMockCaregiverAvatar,
} from 'src/components/create-appointment-fourth/helpers';
import Drawer from 'src/components/reusable/drawer/Drawer';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from 'src/components/reusable/drawer/styles';
import { useLocales } from 'src/locales';
import { appointmentCreationApi } from 'src/redux/api/appointmentCreationAPI';
import { setSelectedCaregiver } from 'src/redux/slices/caregiverSlice';
import { useAppDispatch } from 'src/redux/store';

import { FIRST_SELECTED_TAB } from './constants';
import {
  BookButton,
  DrawerAvatar,
  DrawerDateTenure,
  DrawerItem,
  DrawerStats,
  DrawerTextHeading,
  DrawerTextTitle,
  DrawerTextValue,
  StyledLink,
  StyledTab,
  StyledTabPanel,
  StyledTabs,
  StyledUnorderedList,
  StyledVideo,
} from './styles';

interface CreateAppointmentFourthDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedCaregiverId: string;
}

export default function CreateAppointmentFourthDrawer({
  open,
  onClose,
  selectedCaregiverId,
}: CreateAppointmentFourthDrawerProps): JSX.Element | null {
  const { translate, currentLang } = useLocales();
  const dispatch = useAppDispatch();

  const [selectedTab, setSelectedTab] = useState<string>(FIRST_SELECTED_TAB);

  const { data: selectedCaregiver, isLoading } =
    appointmentCreationApi.useGetCaregiverDetailsQuery(selectedCaregiverId);

  if (isLoading) return null;
  if (!selectedCaregiver) return null;

  const handleTabClick = (_event: SyntheticEvent<Element, Event>, newValue: string): void => {
    setSelectedTab(newValue);
  };

  const handleBookClick = (): void => {
    dispatch(setSelectedCaregiver(selectedCaregiver));
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerHeader>
        <IconButton size="small" onClick={onClose}>
          <ArrowBackFilled />
        </IconButton>
        <DrawerTitle>
          {selectedCaregiver.firstName} {selectedCaregiver.lastName}
        </DrawerTitle>
      </DrawerHeader>
      <DrawerStats flexDirection="row">
        <DrawerAvatar
          src={getMockCaregiverAvatar(BIG_CAREGIVER_AVATAR_SIZE)}
          alt={`${selectedCaregiver.firstName} ${selectedCaregiver.lastName}`}
        />
        <Stack alignItems="center" flexDirection="row" justifyContent="space-evenly" width="100%">
          <Stack flexDirection="column" alignItems="center">
            <FreeCancellation />
            <DrawerTextTitle>
              {translate('createAppointmentFourth.numberOfAppointments')}
            </DrawerTextTitle>
            <DrawerTextValue>{selectedCaregiver.numberOfAppointments}</DrawerTextValue>
          </Stack>
          <Stack flexDirection="column" alignItems="center">
            <MonetizationOn />
            <DrawerTextTitle>{translate('createAppointmentFourth.rate')}</DrawerTextTitle>
            <DrawerTextValue>{selectedCaregiver.caregiverInfo.hourlyRate}</DrawerTextValue>
          </Stack>
        </Stack>
      </DrawerStats>
      <TabContext value={selectedTab}>
        <StyledTabs
          value={selectedTab}
          onChange={handleTabClick}
          scrollButtons={false}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <StyledTab label={translate('createAppointmentFourth.tabs.bio')} value="1" />
          <StyledTab label={translate('createAppointmentFourth.tabs.qualification')} value="2" />
          <StyledTab label={translate('createAppointmentFourth.tabs.workExperience')} value="3" />
          <StyledTab label={translate('createAppointmentFourth.tabs.services')} value="4" />
        </StyledTabs>
        <DrawerBody>
          <StyledTabPanel value="1">
            <DrawerItem>
              <DrawerTextValue>{selectedCaregiver.caregiverInfo.description}</DrawerTextValue>
              <StyledVideo src={selectedCaregiver.caregiverInfo.videoLink} controls />
            </DrawerItem>
          </StyledTabPanel>
          <StyledTabPanel value="2">
            <DrawerTextTitle>
              {translate('createAppointmentFourth.tabs.qualification')}
            </DrawerTextTitle>
            {selectedCaregiver.qualifications.map((qualification) => (
              <DrawerItem key={qualification.id}>
                <Box>
                  <DrawerTextHeading>{qualification.name}</DrawerTextHeading>
                </Box>
                <Box>
                  <DrawerTextTitle>
                    {translate('createAppointmentFourth.certificateNumber')}
                  </DrawerTextTitle>
                  <DrawerTextValue>{qualification.certificateId}</DrawerTextValue>
                </Box>
                <Box>
                  <DrawerTextTitle>
                    {translate('createAppointmentFourth.certificateLink')}
                  </DrawerTextTitle>
                  <StyledLink href={qualification.link} target="_blank">
                    {qualification.link}
                  </StyledLink>
                </Box>
                <Box>
                  <DrawerTextTitle>{translate('createAppointmentFourth.period')}</DrawerTextTitle>
                  <DrawerTextValue>
                    {formatWorkExperienceDateRange(
                      qualification.dateIssued,
                      qualification.expirationDate,
                      translate
                    )}
                  </DrawerTextValue>
                </Box>
              </DrawerItem>
            ))}
          </StyledTabPanel>
          <StyledTabPanel value="3">
            {selectedCaregiver.workExperiences.map((workExperience) => (
              <DrawerItem key={workExperience.id}>
                <Box>
                  <DrawerTextHeading>{workExperience.workplace}</DrawerTextHeading>
                  <DrawerTextTitle>{workExperience.qualifications}</DrawerTextTitle>
                </Box>
                <Box>
                  <DrawerTextTitle>{translate('createAppointmentFourth.period')}</DrawerTextTitle>
                  <Stack flexDirection="row">
                    <DrawerTextValue>
                      {formatWorkExperienceDateRange(
                        workExperience.startDate,
                        workExperience.endDate,
                        translate
                      )}
                    </DrawerTextValue>
                    <DrawerDateTenure>
                      (
                      {formatWorkExperienceDateRangeTenure(
                        workExperience.startDate,
                        workExperience.endDate,
                        currentLang.dateFnsLocale
                      )}
                      )
                    </DrawerDateTenure>
                  </Stack>
                </Box>
              </DrawerItem>
            ))}
          </StyledTabPanel>
          <StyledTabPanel value="4">
            <DrawerItem>
              <StyledUnorderedList>
                {selectedCaregiver.caregiverInfo.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </StyledUnorderedList>
            </DrawerItem>
          </StyledTabPanel>
        </DrawerBody>
      </TabContext>
      <DrawerFooter>
        <BookButton variant="contained" onClick={handleBookClick}>
          {translate('createAppointmentFourth.bookAppointment')}
        </BookButton>
      </DrawerFooter>
    </Drawer>
  );
}
