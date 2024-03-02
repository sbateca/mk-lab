import TableCellComponent from "../../atoms/TableCell/TableCell"
import { TableRow } from "@mui/material"
import { TableRowProps } from "./Types"

function TableRowComponent({ cells }: TableRowProps) {
	return <TableRow>
		{
			cells.map((cell, index) =>{
				return <TableCellComponent key={index} align={cell.align} text={cell.text} />
			})
		}
	</TableRow>
}

export default TableRowComponent;
