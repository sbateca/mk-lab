import {TableHead as MuiTableHead, TableRow} from "@mui/material";

import TableCell from "../TableCell/TableCell";
import {TableHeadProps} from "./Types";

function TableHead({headerLabels}: TableHeadProps): React.ReactElement {
  return (
    <MuiTableHead>
      <TableRow>
        {headerLabels.map((label: string, index: number) => (
          <TableCell key={index} align="left" text={label} />
        ))}
      </TableRow>
    </MuiTableHead>
  );
}

export default TableHead;
