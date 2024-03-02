import { ListItemButton, ListItemText } from "@mui/material"

import { useMenu } from "../../../utils/hooks/useMenu"
import { LisItemButtonProps } from "./Types"

function ListItemButtonComponent({ label }:LisItemButtonProps){
    const { selectedItem, setSelectedItem, toggleMenu } = useMenu();
    const handleItemClick = (item: string) => {
        setSelectedItem(item);
        toggleMenu();
    };
    return (
        <ListItemButton
          selected={selectedItem === label}
          onClick={() => handleItemClick(label)}
        >
          <ListItemText primary={label} />
        </ListItemButton>
    )
}

export default ListItemButtonComponent