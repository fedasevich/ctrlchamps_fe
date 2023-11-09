export interface ISignUpSecond {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  birthDate: Date;
  language: 'en' | 'ua' | 'ru';
  isOpen?: boolean;
}

export interface IProps {
  role: 'caregiver' | 'seeker';
}
