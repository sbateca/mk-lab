import { ActionsButtonsComponentProps } from "../../molecules/ActionButton/Types"
import { TableRowProps } from "../../molecules/TableRow/Types"

export interface TableProps {
	headerLabels: string[];
	rows: TableRowProps[];
	actions?: ActionsButtonsComponentProps | null;
}
