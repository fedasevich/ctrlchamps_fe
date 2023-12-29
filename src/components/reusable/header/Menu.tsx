import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { useRouter } from 'next/router';
import { ROUTES } from 'src/routes';
import { removeToken } from 'src/redux/slices/tokenSlice';
import { removeUser } from 'src/redux/slices/userSlice';
import { useLocales } from 'src/locales';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { TRANSACTION_EXAMPLE, USER_ROLE } from 'src/constants';
import { useUpdateBalanceMutation } from 'src/redux/api/paymentApi';
import { useGetUserInfoQuery } from 'src/redux/api/userApi';
import {
  Arrow,
  BalanceAmount,
  BalanceBlock,
  BalanceParagraph,
  BalanceTitle,
  MenuListItem,
  MenuItemStyled,
  OperationButton,
  StyledMenu,
  HalfVisibleParagraph,
} from './styles';

interface MenuDropdownProps {
  children: React.ReactNode;
  onClick: () => void;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ children, onClick }): JSX.Element | null => {
  const router = useRouter();
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const [updateBalance] = useUpdateBalanceMutation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [balance, setBalance] = useState<number>(0);
  const open = Boolean(anchorEl);
  const user = useTypedSelector((state) => state.user.user);
  const { data: userInfo } = useGetUserInfoQuery(user?.id);

  useEffect(() => {
    if (userInfo?.balance !== undefined) {
      setBalance(userInfo.balance);
    }
  }, [userInfo]);

  if (!user) return null;

  const { role } = user;

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
    onClick();
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogOut = async (): Promise<void> => {
    try {
      dispatch(removeToken());
      dispatch(removeUser());
      handleClose();
      router.push(ROUTES.login);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleWithdraw = async (amount: number): Promise<void> => {
    try {
      const previousBalance = balance;

      setBalance((prevBalance) => prevBalance - amount);

      await updateBalance(previousBalance - amount);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleTopUp = async (amount: number): Promise<void> => {
    try {
      setBalance((prevBalance) => prevBalance + amount);

      await updateBalance(balance + amount);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Button onClick={handleClick} sx={{ padding: '15px' }}>
        <Arrow className={open ? 'active' : ''}>{children}</Arrow>
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <BalanceBlock>
          <BalanceTitle>{translate('menu.balance')}</BalanceTitle>
          <BalanceParagraph>
            <BalanceAmount>
              <HalfVisibleParagraph>$ </HalfVisibleParagraph>
              {balance}
            </BalanceAmount>
            {role === USER_ROLE.Caregiver ? (
              <OperationButton
                variant="contained"
                onClick={(): Promise<void> => handleWithdraw(TRANSACTION_EXAMPLE)}
                disabled={balance < TRANSACTION_EXAMPLE}
              >
                {translate('menu.withdraw')}
              </OperationButton>
            ) : (
              <OperationButton
                variant="contained"
                onClick={(): Promise<void> => handleTopUp(TRANSACTION_EXAMPLE)}
                disabled={balance < TRANSACTION_EXAMPLE}
              >
                {translate('menu.top_up')}
              </OperationButton>
            )}
          </BalanceParagraph>
        </BalanceBlock>
        <MenuItemStyled onClick={handleClose}>
          <ReceiptLongOutlinedIcon />
          <MenuListItem onClick={(): Promise<boolean> => router.push(ROUTES.transactions)}>
            <div>{translate('menu.transactions')}</div>
            <ChevronRightOutlinedIcon />
          </MenuListItem>
        </MenuItemStyled>
        <MenuItemStyled onClick={handleClose}>
          <PersonOutlinedIcon />
          <MenuListItem onClick={(): Promise<boolean> => router.push(ROUTES.account_details)}>
            <div>{translate('menu.acc_details')}</div> <ChevronRightOutlinedIcon />
          </MenuListItem>
        </MenuItemStyled>
        {role === USER_ROLE.Caregiver && (
          <MenuItemStyled onClick={handleClose}>
            <SupportAgentOutlinedIcon />
            <MenuListItem>
              <div>{translate('menu.caregiver_profile')}</div> <ChevronRightOutlinedIcon />
            </MenuListItem>
          </MenuItemStyled>
        )}
        <MenuItemStyled onClick={handleClose}>
          <SettingsOutlinedIcon />
          <MenuListItem>
            <div>{translate('menu.settings')}</div>
            <ChevronRightOutlinedIcon />
          </MenuListItem>
        </MenuItemStyled>
        <MenuItemStyled onClick={handleClose}>
          <InfoOutlinedIcon />
          <MenuListItem onClick={(): Promise<boolean> => router.push(ROUTES.faq)}>
            <div>{translate('menu.faq')}</div> <ChevronRightOutlinedIcon />
          </MenuListItem>
        </MenuItemStyled>
        <MenuItemStyled onClick={handleClose}>
          <FavoriteBorderOutlinedIcon />
          <MenuListItem>
            <div>{translate('menu.get_help')}</div> <ChevronRightOutlinedIcon />
          </MenuListItem>
        </MenuItemStyled>
        <MenuItemStyled onClick={handleClose}>
          <FavoriteBorderOutlinedIcon sx={{ visibility: 'hidden' }} />
          <MenuListItem onClick={handleLogOut}>
            <div>{translate('menu.log_out')} </div> <LogoutOutlinedIcon color="error" />
          </MenuListItem>
        </MenuItemStyled>
      </StyledMenu>
    </>
  );
};

export default MenuDropdown;
