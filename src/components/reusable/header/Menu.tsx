import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Arrow } from './styles';

interface MenuDropdownProps {
  children: React.ReactNode;
  onClick: () => void;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ children, onClick }): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
    onClick();
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} sx={{ padding: 0 }}>
        <Arrow className={open ? 'active' : ''}>{children}</Arrow>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Transactions</MenuItem>
        <MenuItem onClick={handleClose}>Account Details</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>F.A.Q</MenuItem>
        <MenuItem onClick={handleClose}>Get Help</MenuItem>
        <MenuItem onClick={handleClose}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default MenuDropdown;
