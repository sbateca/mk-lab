import { TableCellProps } from "../../atoms/TableCell/Types";

export interface TableRowProps {
	key?: number;
	cells: TableCellProps[];
	actions?: boolean;
}
