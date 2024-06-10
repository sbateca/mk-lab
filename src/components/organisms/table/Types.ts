import {ButtonConfigs} from "../../Molecules/ActionButtons/Types";
import {TableRowProps} from "../../Molecules/TableRow/Types";

export interface TableProps {
  headerLabels: string[];
  rows: TableRowProps[];
  actionButtons?: ButtonConfigs | null;
}
