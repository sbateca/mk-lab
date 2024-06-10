import {TableCell as MuiTableCell} from "@mui/material";

import ActionButtons from "../../Molecules/ActionButtons/ActionButtons";
import {TableCellProps} from "./Types";

function TableCell({
  text,
  align,
  actionButtons,
  index,
}: TableCellProps): React.ReactElement {
  return actionButtons && index === 0 ? (
    <MuiTableCell sx={{margin: 0, padding: 0}} align={align}>
      {<ActionButtons buttonConfigs={actionButtons.buttonConfigs} />}
    </MuiTableCell>
  ) : (
    <MuiTableCell align={align}>{text}</MuiTableCell>
  );
}

export default TableCell;
