import { Drawer, List } from "@mui/material"

import { useMenu } from "../../../utils/hooks/useMenu"
import ListItemButtonComponent from "../../atoms/LisItemButton/LisItemButton"
import { MenuStyle } from "./MenuStyle"
import { MenuProps } from "./Types"

function Menu({menuItems}: MenuProps) {
    const { menuOpen, toggleMenu } = useMenu();
    return (
    <Drawer
      anchor="left"
      open={menuOpen}
      onClose={toggleMenu}
    >
      <List sx={MenuStyle}>
        {
          menuItems.map((item, index) => (
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
