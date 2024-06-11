import {useEffect, useState} from "react";
import {AppBar, Toolbar, IconButton, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import {useMenu} from "../../../Utils/Hooks/useMenu";
import UserMenu from "../UserMenu/UserMenu";
import {HeaderProps} from "./Type";
import {localStorageToUser} from "../../../Adapters/user";
import {LOCAL_STORAGE_USER_KEY} from "../../../Utils/Constants/pages/shared";

function Header({companyName}: HeaderProps): React.ReactElement {
  const {toggleMenu} = useMenu();
  const [username, setUsername] = useState("");
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    const user = localStorageToUser(
      localStorage.getItem(LOCAL_STORAGE_USER_KEY),
    );
    if (user) {
      setUsername(user?.name);
      setUserMenu(true);
    }
  }, []);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">{companyName}</Typography>
        {userMenu ? <UserMenu username={username} /> : null}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
