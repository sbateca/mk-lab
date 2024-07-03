import {TableCell as MuiTableCell} from "@mui/material";

import {TableCellProps} from "./Types";

function TableCell({children, align}: TableCellProps): React.ReactElement {
  return <MuiTableCell align={align}>{children}</MuiTableCell>;
}

export default TableCell;
