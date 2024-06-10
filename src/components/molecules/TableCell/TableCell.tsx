import {TableCell as MuiTableCell} from "@mui/material";

import ActionButtons from "../ActionButtons/ActionButtons";
import {TableCellProps} from "./Types";

function TableCell({
  text,
  align,
  buttonConfigs,
  index,
}: TableCellProps): React.ReactElement {
  return buttonConfigs && index === 0 ? (
    <MuiTableCell sx={{margin: 0, padding: 0}} align={align}>
      {<ActionButtons buttonConfigs={buttonConfigs.buttonConfigs} />}
    </MuiTableCell>
  ) : (
    <MuiTableCell align={align}>{text}</MuiTableCell>
  );
}

export default TableCell;
