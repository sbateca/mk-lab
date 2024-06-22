import {TableCell as MuiTableCell} from "@mui/material";

import {TableCellProps} from "./Types";
import TableActionButtons from "../TableActionButtons/TableActionButtons";

function TableCell({text, align, index}: TableCellProps): React.ReactElement {
  return index === 0 ? (
    <MuiTableCell sx={{margin: 0, padding: 0}} align={align}>
      {<TableActionButtons />}
    </MuiTableCell>
  ) : (
    <MuiTableCell align={align}>{text}</MuiTableCell>
  );
}

export default TableCell;
