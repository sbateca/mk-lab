import { TableCell, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { TableCellProps } from "./Types";

function TableCellComponent({ text, align, actions, index }: TableCellProps) {
  return actions && index==0 ? <TableCell align={align}><IconButton><SearchIcon /></IconButton></TableCell>:
  <TableCell align={align}>{text}</TableCell>
}

export default TableCellComponent;
