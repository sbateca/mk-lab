import {ListItemButton as MuiListItemButton, ListItemText} from "@mui/material";

import {useMenu} from "../../../Utils/Hooks/useMenu";
import {LisItemButtonProps} from "./Types";
import React from "react";

function ListItemButton({label}: LisItemButtonProps): React.ReactElement {
  const {
    selectedMenuItem: selectedMenuItem,
    setSelectedMenuItem: setSelectedItem,
    toggleMenu,
  } = useMenu();

  const handleClick = (item: string) => {
    setSelectedItem(item);
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
