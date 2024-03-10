import TableCellComponent from "../../atoms/TableCell/TableCell";
import { TableRow } from "@mui/material";
import { TableRowProps } from "./Types";
import { useEffect, useState } from "react";

function TableRowComponent({ cells, actions }: TableRowProps) {
	const [newCells, setNewCells] = useState(cells);
	useEffect(() => {
		if (actions) {
			setNewCells([{ text: "", align: "center" }, ...cells]);
		}
	}, [actions]);

	return (
		<TableRow>
			{newCells.map((cell, index) => {
				return actions ? (
					<TableCellComponent key={index} align={cell.align} text={cell.text} actions={actions} index={index} />
				) : (
					<TableCellComponent key={index} align={cell.align} text={cell.text} />
				);
			})}
		</TableRow>
	);
}

export default TableRowComponent;
