import { TabContext } from '@mui/lab';
import { Box, IconButton, Stack } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import FreeCancellation from 'src/assets/icons/FreeCancellation';
import MonetizationOn from 'src/assets/icons/MonetizationOn';

import Drawer from 'src/components/reusable/drawer/Drawer';
import UserAvatar from 'src/components/reusable/user-avatar/UserAvatar';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from 'src/components/reusable/drawer/styles';
import { useLocales } from 'src/locales';
import { appointmentApi } from 'src/redux/api/appointmentApi';
import { BIG_AVATAR_SIZE } from 'src/constants';

import ReviewModal from 'src/components/review-modal/ReviewModal';
import { FIRST_SELECTED_TAB } from './constants';
import { formatWorkExperienceDateRange, formatWorkExperienceDateRangeTenure } from './helpers';
import {
  DrawerDateTenure,
  DrawerItem,
  DrawerStats,
  DrawerTextHeading,
  DrawerTextTitle,
  DrawerTextValue,
  StyledLink,
  StyledStack,
  StyledTab,
  StyledTabPanel,
  StyledTabs,
  StyledUnorderedList,
  StyledVideo,
} from './styles';

interface CaregiverDrawerProps {
  open: boolean;
  onClose: () => void;
  caregiverId: string;
  footer?: React.ReactNode;
}

export default function CaregiverDrawer({
  open,
  onClose,
  caregiverId,
  footer,
}: CaregiverDrawerProps): JSX.Element | null {
  const { translate, currentLang } = useLocales();

  const [selectedTab, setSelectedTab] = useState<string>(FIRST_SELECTED_TAB);
  const [isReviewCaregiverModalActive, setIsReviewCaregiverModalActive] = useState<boolean>(true);

  const handleReviewCaregiverModal = (): void =>
    setIsReviewCaregiverModalActive(!isReviewCaregiverModalActive);

  const { data: selectedCaregiver, isLoading } =
    appointmentApi.useGetCaregiverDetailsQuery(caregiverId);

  if (isLoading) return null;
  if (!selectedCaregiver) return null;

  const handleTabClick = (_event: SyntheticEvent<Element, Event>, newValue: string): void => {
    setSelectedTab(newValue);
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
        <UserAvatar userId={selectedCaregiver.id} size={BIG_AVATAR_SIZE} />
        <StyledStack>
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
        </StyledStack>
      </DrawerStats>
      <TabContext value={selectedTab}>
        <StyledTabs
          value={selectedTab}
          scrollButtons="auto"
          onChange={handleTabClick}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <StyledTab label={translate('createAppointmentFourth.tabs.bio')} value="1" />
          <StyledTab label={translate('createAppointmentFourth.tabs.qualification')} value="2" />
          <StyledTab label={translate('createAppointmentFourth.tabs.workExperience')} value="3" />
          <StyledTab label={translate('createAppointmentFourth.tabs.services')} value="4" />
          <StyledTab label="ReviewModal" value="5" />
        </StyledTabs>
        <DrawerBody>
          <StyledTabPanel value="1">
            <DrawerItem>
              <DrawerTextValue>{selectedCaregiver.caregiverInfo.description}</DrawerTextValue>
              {selectedCaregiver.caregiverInfo.videoLink && (
                <StyledVideo src={selectedCaregiver.caregiverInfo.videoLink} controls />
              )}
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
          <StyledTabPanel value="5">
            <DrawerItem>
              <button type="button" onClick={handleReviewCaregiverModal}>
                ReviewModal
              </button>
              <ReviewModal
                caregiverId={selectedCaregiver.id}
                isReviewCaregiverModalActive={isReviewCaregiverModalActive}
                setIsReviewCaregiverModalActive={setIsReviewCaregiverModalActive}
                caregiverName={`${selectedCaregiver.firstName} ${selectedCaregiver.lastName}`}
              />
            </DrawerItem>
          </StyledTabPanel>
        </DrawerBody>
      </TabContext>
      {!!footer && <DrawerFooter>{footer}</DrawerFooter>}
    </Drawer>
  );
}
