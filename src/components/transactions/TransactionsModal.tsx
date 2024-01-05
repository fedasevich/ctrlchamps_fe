import React from 'react';
import { ChevronRight } from '@mui/icons-material';
import { Button } from '@mui/material';

import { useLocales } from 'src/locales';
import { USER_ROLE } from 'src/constants';
import { Transaction } from 'src/redux/api/transactionsApi';
import {
  IconWrapper,
  TransactionModalTitle,
  TransactionParagraph,
  TransactionsModalWrapper,
} from './styles';
import { getTransactionColor, getTransactionIcon, getTransactionTitle } from './helpers';
import { InlineBlock } from '../appointment-request-modal/styles';

type TransactionsModalProps = {
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  transactions: Transaction[];
  openDrawer: (appointmentId: string) => void;
};

const TransactionsModal = ({
  role,
  transactions,
  openDrawer,
}: TransactionsModalProps): JSX.Element => {
  const { translate } = useLocales();

  return (
    <TransactionsModalWrapper>
      <TransactionModalTitle>{translate('transactions.transactions')}</TransactionModalTitle>
      {transactions &&
        transactions.map((transaction) => (
          <TransactionParagraph key={transaction.id}>
            <InlineBlock>
              <IconWrapper backgroundColor={getTransactionColor(transaction.type, role)}>
                {getTransactionIcon(transaction.type)}
              </IconWrapper>
              <div>
                {getTransactionTitle(transaction.type, role, transaction.amount, translate)}
              </div>
            </InlineBlock>
            {transaction.appointmentId && (
              <Button
                color="inherit"
                onClick={(): void => openDrawer(transaction.appointmentId as string)}
              >
                <ChevronRight />
              </Button>
            )}
          </TransactionParagraph>
        ))}
    </TransactionsModalWrapper>
  );
};

export default TransactionsModal;
