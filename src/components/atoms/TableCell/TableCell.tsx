import { TableCell } from "@mui/material";

import { TableCellProps } from "./Types";
import ActionsButtonsComponent from "../../molecules/ActionButton/ActionsButtons";

function TableCellComponent({ text, align, actions, index }: TableCellProps) {
	return actions && index == 0 ? (
		<TableCell sx={{ margin: 0, padding: 0 }} align={align}>
			{<ActionsButtonsComponent actions={actions.actions} />}
		</TableCell>
	) : (
		<TableCell align={align}>{text}</TableCell>
	);
}

export default TableCellComponent;
