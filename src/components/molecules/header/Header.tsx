import {useEffect, useState} from "react";
import {AppBar, Toolbar, IconButton, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import {useMenu} from "../../../Utils/Hooks/useMenu";
import {useCookies} from "../../../Utils/Hooks/useCookies";
import UserMenu from "../UserMenu/UserMenu";
import {HeaderProps} from "./Type";
import {cookiesToUser} from "../../../Adapters/user";

function Header({companyName}: HeaderProps): React.ReactElement {
  const {toggleMenu} = useMenu();
  const [username, setUsername] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const cookies = useCookies();

  useEffect(() => {
    const user = cookiesToUser(cookies);
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
        {userMenu ? <UserMenu username={username} cookies={cookies} /> : null}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
