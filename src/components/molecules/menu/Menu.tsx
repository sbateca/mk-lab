import { Drawer, List } from "@mui/material"

import { useMenu } from "../../../utils/hooks/useMenu"
import ListItemButtonComponent from "../../atoms/LisItemButton/LisItemButton"
import { MenuStyle } from "./MenuStyle"
import { MENU_ITEMS } from "../../../config/constants"

function Menu() {
    const { menuOpen, toggleMenu } = useMenu();
    return (
    <Drawer
      anchor="left"
      open={menuOpen}
      onClose={toggleMenu}
    >
      <List sx={MenuStyle}>
        {
          MENU_ITEMS.map((item, index) => (
            <ListItemButtonComponent
              key={index}
              label={item.label}
            />
        ))}
      </List>
    </Drawer>
  );
}

export default Menu;
