import { format } from 'date-fns';
import { DRAWER_DATE_FORMAT } from './constants';

export const getMockCaregiverAvatar = (size: number): string =>
  `https://picsum.photos/${size}/${size}`;

export const getFormattedDate = (date: Date): string => format(date, DRAWER_DATE_FORMAT);

export const mockedTasks = [
  { id: 1, name: 'Task 1' },
  { id: 2, name: 'Task 2' },
  { id: 3, name: 'Task 3' },
];

export const mockedCaregiver = {
  firstName: 'Smith',
  lastName: 'Jacobs',
  id: '111',
};

export const mockedAppointments = [
  {
    id: '1',
    userId: '1',
    caregiverInfoId: '1',
    name: 'Comprehensive Medical Management Plan',
    status: 'Pending confirmation',
    type: 'One time',
    location: 'USA',
    startDate: new Date(),
    endDate: new Date(),
    timezone: 'UTC-3',
  },
  {
    id: '2',
    userId: '2',
    caregiverInfoId: '2',
    name: 'ADL and IADL Support Plan',
    status: 'Active',
    type: 'Recurring',
    location: 'USA',
    startDate: new Date(),
    endDate: new Date(),
    timezone: 'UTC-3',
  },
  {
    id: '3',
    userId: '3',
    caregiverInfoId: '3',
    name: 'ADL and IADL Support Plan',
    status: 'Accepted',
    type: 'One time',
    location: 'USA',
    startDate: new Date(),
    endDate: new Date(),
    timezone: 'UTC-3',
  },
  {
    id: '5',
    userId: '5',
    caregiverInfoId: '5',
    name: 'Cognitive Support Plan',
    status: 'Virtual assessment',
    type: 'Recurring',
    location: 'USA',
    startDate: new Date(),
    endDate: new Date(),
    timezone: 'UTC-3',
  },
  {
    id: '4',
    userId: '4',
    caregiverInfoId: '4',
    name: 'Cognitive Support Plan',
    status: 'Rejected',
    type: 'Recurring',
    location: 'USA',
    startDate: new Date(),
    endDate: new Date(),
    timezone: 'UTC-3',
  },
];
