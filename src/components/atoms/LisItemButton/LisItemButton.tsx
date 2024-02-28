import { ListItemButton, ListItemText } from "@mui/material"
import { Link, LinkProps } from "react-router-dom"

import { useMenu } from "../../../utils/hooks/useMenu"

interface LisItemButtonProps {
    component: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>> | typeof Link;
    to: string;
    label: string;
}

function ListItemButtonComponent({ component, to, label }:LisItemButtonProps){
    const { selectedItem, setSelectedItem, toggleMenu } = useMenu();
    const handleItemClick = (item: string) => {
        setSelectedItem(item);
        toggleMenu();
    };
    return (
        <ListItemButton
          component={component}
          to={to}
          selected={selectedItem === label}
          onClick={() => handleItemClick(label)}
        >
          <ListItemText primary={label} />
        </ListItemButton>
    )
}

export default ListItemButtonComponent