import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { PRIMARY, SECONDARY } from '../../theme/colors';
import { TransactionAmmount } from './styles';

export const getTransactionColor = (type: string): string => {
  switch (type) {
    case 'Outcome':
      return PRIMARY.main;
    case 'Income':
      return SECONDARY.error;
    default:
      return '';
  }
};

export const getTransactionTitle = (
  type: string,
  role: string,
  amount: number,
  translate: (key: string) => string
): React.ReactNode => {
  switch (type) {
    case 'Outcome':
      return role === 'Seeker' ? (
        <span>
          {translate('transactions.payment_sent')}:{' '}
          <TransactionAmmount>${amount}</TransactionAmmount>
          {translate('transactions.for_your_appointment')}
        </span>
      ) : (
        <span>
          {translate('transactions.withdrawal')}: <TransactionAmmount>${amount}</TransactionAmmount>
        </span>
      );
    case 'Income':
      return role === 'Caregiver' ? (
        <span>
          {translate('transactions.payment_received')}:{' '}
          <TransactionAmmount>${amount}</TransactionAmmount>{' '}
          {translate('transactions.for_your_appointment')}
        </span>
      ) : (
        <span>
          {translate('transactions.top_up')}: <TransactionAmmount>${amount}</TransactionAmmount>
        </span>
      );
    default:
      return null;
  }
};

export const getTransactionIcon = (type: string): React.ReactNode => {
  switch (type) {
    case 'Outcome':
      return <ArrowDownwardIcon sx={{ color: 'white' }} />;
    case 'Income':
      return <ArrowUpwardIcon sx={{ color: 'white' }} />;
    default:
      return null;
  }
};
