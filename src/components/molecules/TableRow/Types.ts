import { TableCellProps } from "../../atoms/TableCell/Types";
import { ActionsButtonsComponentProps } from "../ActionButton/Types";

export interface TableRowProps {
	key?: number;
	cells: TableCellProps[];
	actions?: ActionsButtonsComponentProps | null;
}
