import { TabContext } from '@mui/lab';
import { Avatar, Box, IconButton, Rating, Stack } from '@mui/material';
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
import { BIG_AVATAR_SIZE, SORT_ORDER } from 'src/constants';
import Grade from 'src/assets/icons/Grade';

import { FIRST_SELECTED_TAB } from './constants';
import { formatWorkExperienceDateRange, formatWorkExperienceDateRangeTenure } from './helpers';
import {
  DrawerDateTenure,
  DrawerItem,
  DrawerStats,
  DrawerTextHeading,
  DrawerTextTitle,
  DrawerTextValue,
  ReviewHeader,
  SortButton,
  StyledLink,
  StyledSortIcon,
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

const mockedReviews = [
  {
    id: 1,
    rate: 4,
    avatar: null,
    name: 'James Bean',
    text: 'Everything was good',
    date: '27/11/2022',
  },
  {
    id: 2,
    rate: 5,
    avatar: null,
    name: 'Ricardo Bean',
    text: 'Everything was good',
    date: '29/11/2022',
  },
  {
    id: 3,
    rate: 3,
    avatar: null,
    name: 'Bruce Wayne',
    text: 'Everything was good',
    date: '27/12/2022',
  },
  {
    id: 4,
    rate: 5,
    avatar: null,
    name: 'Gabriel Mane',
    text: 'Everything was good',
    date: '27/12/2023',
  },
  {
    id: 5,
    rate: 5,
    avatar: null,
    name: 'Carl Mane',
    text: 'Everything was good',
    date: '29/12/2023',
  },
];

export default function CaregiverDrawer({
  open,
  onClose,
  caregiverId,
  footer,
}: CaregiverDrawerProps): JSX.Element | null {
  const { translate, currentLang } = useLocales();

  const [selectedTab, setSelectedTab] = useState<string>(FIRST_SELECTED_TAB);
  const [sortingOrderRate, setSortingOrderRate] = useState<string>(SORT_ORDER.DESC);
  const [sortingOrderDate, setSortingOrderDate] = useState<string>('');

  const { data: selectedCaregiver, isLoading } =
    appointmentApi.useGetCaregiverDetailsQuery(caregiverId);

  if (isLoading) return null;
  if (!selectedCaregiver) return null;

  const handleTabClick = (_event: SyntheticEvent<Element, Event>, newValue: string): void => {
    setSelectedTab(newValue);
  };

  const handleChangeSortingRate = (): void => {
    if (sortingOrderRate === SORT_ORDER.ASC || !sortingOrderRate) {
      setSortingOrderRate(SORT_ORDER.DESC);
      setSortingOrderDate('');
    } else {
      setSortingOrderRate(SORT_ORDER.ASC);
      setSortingOrderDate('');
    }
  };

  const handleChangeSortingDate = (): void => {
    if (sortingOrderDate === SORT_ORDER.ASC || !sortingOrderDate) {
      setSortingOrderDate(SORT_ORDER.DESC);
      setSortingOrderRate('');
    } else {
      setSortingOrderDate(SORT_ORDER.ASC);
      setSortingOrderRate('');
    }
  };

  const averageRate =
    mockedReviews.map((review) => review.rate).reduce((sum, rate) => sum + rate, 0) /
    mockedReviews.length;

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
            <Grade />
            <DrawerTextTitle>{translate('createAppointmentFourth.rating')}</DrawerTextTitle>
            <DrawerTextValue>{averageRate.toFixed(1)}</DrawerTextValue>
          </Stack>
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
          <StyledTab label={translate('createAppointmentFourth.tabs.reviews')} value="5" />
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
            <StyledStack>
              <SortButton onClick={handleChangeSortingDate}>
                {translate('createAppointmentFourth.sortingDate')}
                {sortingOrderDate === SORT_ORDER.DESC || !sortingOrderDate ? (
                  <StyledSortIcon />
                ) : (
                  <StyledSortIcon sx={{ transform: 'rotate(180deg)' }} />
                )}
              </SortButton>
              <SortButton onClick={handleChangeSortingRate}>
                {translate('createAppointmentFourth.sortingRating')}
                {sortingOrderRate === SORT_ORDER.DESC || !sortingOrderRate ? (
                  <StyledSortIcon />
                ) : (
                  <StyledSortIcon sx={{ transform: 'rotate(180deg)' }} />
                )}
              </SortButton>
            </StyledStack>

            {mockedReviews.map((review) => (
              <DrawerItem key={review.id}>
                <Box display="flex" justifyContent="space-between">
                  <ReviewHeader>
                    <Avatar src={review.avatar || undefined} />
                    <Box>
                      <DrawerTextHeading>{review.name}</DrawerTextHeading>
                      <Rating name="read-only" value={review.rate} readOnly size="small" />
                    </Box>
                  </ReviewHeader>
                  <DrawerTextValue>{review.date}</DrawerTextValue>
                </Box>
                <Box>
                  <DrawerTextValue>{review.text}</DrawerTextValue>
                </Box>
              </DrawerItem>
            ))}
          </StyledTabPanel>
        </DrawerBody>
      </TabContext>
      {!!footer && <DrawerFooter>{footer}</DrawerFooter>}
    </Drawer>
  );
}
