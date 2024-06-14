import {Drawer, List} from "@mui/material";

import ListItemButton from "../../atoms/ListItemButton/ListItemButton";
import {useMenu} from "../../../utils/hooks/useMenu";
import {MenuStyle} from "./MenuStyle";
import {MenuProps} from "./Types";

function Menu({menuItems}: MenuProps): React.ReactElement {
  const {menuOpen, toggleMenu} = useMenu();
  return (
    <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
      <List sx={MenuStyle}>
        {menuItems.map((item, index) => (
          <ListItemButton key={index} label={item.label} />
        ))}
      </List>
    </Drawer>
  );
}

export default Menu;
