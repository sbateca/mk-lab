import {Drawer} from "@mui/material";
import {DetailProps} from "./Types";

function SideSection({isOpen, children}: DetailProps) {
  return (
    <Drawer open={isOpen} anchor="right">
      {children}
    </Drawer>
  );
}

export default SideSection;
