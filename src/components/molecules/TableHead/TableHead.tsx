import { TableHead, TableRow } from "@mui/material"
import TableCellComponent from "../../atoms/TableCell/TableCell"
import { TableHeadProps } from "./Types"

function TableHeadComponent({headerLabels}: TableHeadProps) {
	return (
		<TableHead>
			<TableRow>
				{headerLabels.map((label: string, index: number) => (
					<TableCellComponent key={index} align='center' text={label} />
				))}
			</TableRow>
		</TableHead>
	);
}

export default TableHeadComponent;
