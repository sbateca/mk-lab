import { TableCell } from "@mui/material";
import { TableCellProps } from "./Types";

function TableCellComponent({ text, align }: TableCellProps) {
  return <TableCell align={align}>{text}</TableCell>
}

export default TableCellComponent;
