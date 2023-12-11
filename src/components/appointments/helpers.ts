import { format } from 'date-fns';
import { DRAWER_DATE_FORMAT } from './constants';

export const getMockCaregiverAvatar = (size: number): string =>
  `https://picsum.photos/${size}/${size}`;

export const getFormattedDate = (date: Date): string => format(date, DRAWER_DATE_FORMAT);

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
    details: 'ref',
    payment: 5,
    activityNote: 'activityNoteactivityNote',
    diagnosisNote: 'diagnosisNotediagnosisNote',
    capabilityNote: 'capabilityNotecapabilityNote',
  },
  {
    id: '4',
    userId: '4',
    caregiverInfoId: '4',
    name: 'Cognitive Support Plan',
    status: 'Virtual assessment',
    type: 'Recurring',
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
    status: 'Rejected',
    type: 'Recurring',
    location: 'USA',
    startDate: new Date(),
    endDate: new Date(),
    timezone: 'UTC-3',
  },
];

export const mockedAppointment = {
  id: '1',
  userId: '4a6264dd-9280-4884-bc5d-fc0b9ddf9640',
  caregiverInfoId: '227ee80d-217a-4b1d-9cb5-44d9660f88ad',
  name: 'Comprehensive Medical Management Plan',
  status: 'Pending confirmation',
  type: 'One time',
  location: 'USA',
  startDate: new Date(),
  endDate: new Date(),
  timezone: 'UTC-3',
  details: 'ref',
  payment: 5,
  activityNote: 'activityNoteactivityNote',
  diagnosisNote: 'diagnosisNotediagnosisNote',
  capabilityNote: 'capabilityNotecapabilityNote',
  weekday: '["Monday","Sunday"]',
  seekerTasks: [
    {
      appointmentId: '11',
      name: 'task 1',
    },
    {
      appointmentId: '22',
      name: 'task 2',
    },
    {
      appointmentId: '33',
      name: 'task 3',
    },
    {
      appointmentId: '44',
      name: 'task 4',
    },
  ],
  caregiverInfo: {
    id: '123',
    user: {
      id: '1234',
      firstName: 'Vova',
      lastName: 'Qwerty',
    },
  },
};
