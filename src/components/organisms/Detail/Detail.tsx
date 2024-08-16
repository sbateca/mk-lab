import {Drawer} from "@mui/material";

import {DetailProps} from "./Types";

export const Detail = ({isOpen, children, setIsOpen}: DetailProps) => {
  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)} anchor="right">
      {children}
    </Drawer>
  );
};
