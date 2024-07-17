import {TableRow as MuiTableRow} from "@mui/material";

import TableCell from "../TableCell/TableCell";
import {TableRowProps} from "./Types";
import TableActionButtons from "../TableActionButtons/TableActionButtons";

function TableRow({id, cells}: TableRowProps): React.ReactElement {
  return (
    <MuiTableRow>
      {cells.map((cell, index) => {
        return (
          <TableCell key={`table-cell-${index.toString()}`} align={cell.align}>
            {cell.children}
          </TableCell>
        );
      })}
      <TableCell align={"left"}>
        <TableActionButtons sampleId={id ?? ""} />
      </TableCell>
    </MuiTableRow>
  );
}

export default TableRow;
