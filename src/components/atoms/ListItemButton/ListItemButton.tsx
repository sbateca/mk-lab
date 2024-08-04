import {ListItemButton as MuiListItemButton, ListItemText} from "@mui/material";

import {useMenu} from "../../../utils/hooks/useMenu";
import {LisItemButtonProps} from "./Types";
import React from "react";
import {SharedMenuItems} from "../../../utils/enums";

function ListItemButton({label}: LisItemButtonProps): React.ReactElement {
  const {selectedMenuItem, setSelectedMenuItem, toggleMenu} = useMenu();

  const handleClick = (item: SharedMenuItems) => {
    setSelectedMenuItem(item);
    toggleMenu();
  };

  return (
    <MuiListItemButton
      selected={selectedMenuItem === label}
      onClick={() => handleClick(label)}
    >
      <ListItemText primary={label} />
    </MuiListItemButton>
  );
}

export default ListItemButton;
