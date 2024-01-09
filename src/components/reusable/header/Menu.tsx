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
import { useUpdateBalanceMutation } from 'src/redux/api/transactionsApi';
import { useGetUserInfoQuery } from 'src/redux/api/userApi';
import GetHelpModal from 'src/components/get-help-modal/GetHelpModal';
import Modal from 'src/components/reusable/modal/Modal';
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
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const user = useTypedSelector((state) => state.user.user);
  const { data: userInfo, refetch } = useGetUserInfoQuery(user?.id);

  const [balance, setBalance] = React.useState<number>(userInfo?.balance || 0);

  const open = Boolean(anchorEl);
  const [isUpdatingBalance, setIsUpdatingBalance] = useState<boolean>(false);
  const { role } = user || {};

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!user) return null;

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
    onClick();
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogOut = (): void => {
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
      if (userInfo && !isUpdatingBalance) {
        setIsUpdatingBalance(true);
        const newBalance = userInfo.balance - amount;
        setBalance(newBalance);
        await updateBalance(newBalance);
        refetch();
        setIsUpdatingBalance(false);
      }
    } catch (error) {
      setIsUpdatingBalance(false);
      throw new Error(error);
    }
  };

  const handleTopUp = async (amount: number): Promise<void> => {
    try {
      if (userInfo && !isUpdatingBalance) {
        setIsUpdatingBalance(true);
        const newBalance = userInfo.balance + amount;
        setBalance(newBalance);
        await updateBalance(newBalance);
        refetch();
        setIsUpdatingBalance(false);
      }
    } catch (error) {
      setIsUpdatingBalance(false);
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
                disabled={balance < TRANSACTION_EXAMPLE || isUpdatingBalance}
              >
                {translate('menu.withdraw')}
              </OperationButton>
            ) : (
              <OperationButton
                variant="contained"
                onClick={(): Promise<void> => handleTopUp(TRANSACTION_EXAMPLE)}
                disabled={isUpdatingBalance}
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
            <MenuListItem onClick={(): Promise<boolean> => router.push(ROUTES.caregiver_profile)}>
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
          <MenuListItem onClick={(): void => setIsHelpModalOpen(true)}>
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
      <Modal
        title={translate('needHelpModal.title')}
        onClose={(): void => setIsHelpModalOpen(false)}
        isActive={isHelpModalOpen}
      >
        <GetHelpModal />
      </Modal>
    </>
  );
};

export default MenuDropdown;
