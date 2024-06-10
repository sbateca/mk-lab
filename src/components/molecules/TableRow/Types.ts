import {TableCellProps} from "../../Atoms/TableCell/Types";
import {ButtonConfigs} from "../ActionButtons/Types";

export interface TableRowProps {
  key?: number;
  cells: TableCellProps[];
  actionButtons?: ButtonConfigs | null;
}
