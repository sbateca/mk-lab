import {Drawer, List} from "@mui/material";

import {ListItemButton} from "../../atoms";
import {useMenu} from "../../../utils/hooks";
import {MenuStyle} from "./MenuStyle";
import {MenuProps} from "./Types";

export const Menu = ({menuItems}: MenuProps): React.ReactElement => {
  const {menuOpen, toggleMenu} = useMenu();
  return (
    <Drawer
      anchor="left"
      open={menuOpen}
      onClose={toggleMenu}
      data-testid="mainMenu"
    >
      <List sx={MenuStyle} data-testid="menuList">
        {menuItems.map((item, index) => (
          <ListItemButton key={index} label={item.label} />
        ))}
      </List>
    </Drawer>
  );
};
