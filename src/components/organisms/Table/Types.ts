import {ButtonConfigs} from "../../molecules/ActionButtons/Types";
import {TableRowProps} from "../../molecules/TableRow/Types";

export interface TableProps {
  headerLabels: string[];
  rows: TableRowProps[];
  buttonConfigs?: ButtonConfigs | null;
}
