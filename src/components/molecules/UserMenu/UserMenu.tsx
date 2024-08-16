import {useState} from "react";

import {IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

import {
  USER_MENU_LOGOUT,
  LOCAL_STORAGE_USER_KEY,
} from "../../../utils/constants";
import {UserMenuStyle} from "./UserMenuStyle";

interface UserMenuProps {
  username: string;
}

export const UserMenu = ({username}: UserMenuProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    window.location.reload();
  };

  return (
    <div style={UserMenuStyle}>
      <Typography>{username}</Typography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={handleLogout}>{USER_MENU_LOGOUT}</MenuItem>
      </Menu>
    </div>
  );
};
