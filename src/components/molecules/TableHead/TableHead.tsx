import {TableHead, TableRow} from "@mui/material";

import TableCellComponent from "../../Atoms/TableCell/TableCell";
import {TableHeadProps} from "./Types";

function TableHeadComponent({headerLabels}: TableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headerLabels.map((label: string, index: number) => (
          <TableCellComponent key={index} align="left" text={label} />
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeadComponent;
