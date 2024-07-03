import {TableCellProps} from "../TableCell/Types";
export interface TableRowProps {
  id?: string;
  key?: string;
  cells: TableCellProps[];
}
