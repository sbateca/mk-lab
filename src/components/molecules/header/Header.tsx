import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useMenu } from "../../../utils/hooks/useMenu";
import { HeaderProps } from "./Type";

function Header({companyName}: HeaderProps) {
  const { toggleMenu } = useMenu();
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
        <Typography variant="h6">
          {companyName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
