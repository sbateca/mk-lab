import {useState} from "react";
import {IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {Cookie} from "universal-cookie";

import {UserMenuStyle} from "./UserMenuStyle";
import {USER_MENU_LOGOUT} from "../../../Utils/Constants/pages/admin";

interface UserMenuProps {
  username: string;
  cookies: Cookie;
}

function UserMenu({username, cookies}: UserMenuProps): React.ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    cookies.remove("userData");
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
}

export default UserMenu;
