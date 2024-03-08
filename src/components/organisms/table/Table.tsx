import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import { Typography } from "@mui/material"
import Paper from "@mui/material/Paper"

import TableHeadComponent from "../../molecules/TableHead/TableHead"
import TableRowComponent from "../../molecules/TableRow/TableRow"
import { TableStyles } from "./TableStyles"
import { TableProps } from "./Types"

export default function TableComponent({ headerLabels, rows }: TableProps) {
	return (
		<TableContainer component={Paper}>
			{rows.length == 0 ? (
				<Typography sx={TableStyles.noContentStyle}>
					No records to display
				</Typography>
			) : (
				<Table sx={{ minWidth: 650 }} aria-label='sample table'>
					<TableHeadComponent headerLabels={headerLabels} />
					<TableBody>
						{rows.map((row, index) => (
							<TableRowComponent key={index} cells={row.cells} />
						))}
					</TableBody>
				</Table>
			)}
		</TableContainer>
	);
}
