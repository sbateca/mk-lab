import React from "react";

import {ListItemButton as MuiListItemButton, ListItemText} from "@mui/material";

import {useMenu} from "../../../utils/hooks";
import {LisItemButtonProps} from "./Types";
import {SharedMenuItems} from "../../../utils/enums";

export const ListItemButton = ({
  label,
}: LisItemButtonProps): React.ReactElement => {
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
};
