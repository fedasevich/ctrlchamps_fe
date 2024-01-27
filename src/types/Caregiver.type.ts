import { PreferredDay } from 'src/constants/enums';
import { User } from 'src/redux/slices/userSlice';

export type Caregiver = {
  id: string;
  isOpenToSeekerHomeLiving: boolean;
  firstName: string;
  lastName: string;
  numberOfAppointments: number;
  caregiverInfo: CaregiverInfo;
  qualifications: Certificate[];
  workExperiences: WorkExperiences[];
  seekerReviews?: SeekerReviews[];
};

export type SeekerReviews = {
  id: string;
  createdAt: string;
  caregiverInfoId: string;
  rating: string;
  review?: string;
  user: User;
};

export type CaregiverInfo = {
  id: string;
  services: string[];
  hourlyRate: number;
  description: string;
  videoLink: string;
  availability: TimeSlot[];
};

export type WorkExperiences = {
  id: string;
  workplace: string;
  qualifications: string;
  startDate: string;
  endDate: string | null;
};

export type Certificate = {
  id: string;
  name: string;
  certificateId: string;
  link: string;
  dateIssued: string;
  expirationDate: string | null;
};

export type TimeSlot = {
  day: PreferredDay;
  startTime: string;
  endTime: string;
};
