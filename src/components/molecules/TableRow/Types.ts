import {TableCellProps} from "../TableCell/Types";
import {ButtonConfigs} from "../ActionButtons/Types";

export interface TableRowProps {
  key?: number;
  cells: TableCellProps[];
  buttonConfigs?: ButtonConfigs | null;
}
