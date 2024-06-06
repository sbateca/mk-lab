import {ActionsButtonsComponentProps} from "../../Molecules/ActionButton/Types";
import {TableRowProps} from "../../Molecules/TableRow/Types";

export interface TableProps {
  headerLabels: string[];
  rows: TableRowProps[];
  actions?: ActionsButtonsComponentProps | null;
}
