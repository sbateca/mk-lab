import { useEffect, useState } from "react"
import { Typography } from "@mui/material"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import Paper from "@mui/material/Paper"

import TableHeadComponent from "../../molecules/TableHead/TableHead"
import TableRowComponent from "../../molecules/TableRow/TableRow"
import { TableProps } from "./Types"
import { TableStyles } from "./TableStyles"

export default function TableComponent({ headerLabels, rows, actions }: TableProps) {
	const [newHeaderLabels, setNewHeaderLabels] = useState(headerLabels);
	useEffect(() => {
		if (actions) {
			setNewHeaderLabels(["Actions", ...headerLabels]);
		}
	}, [actions]);

	return (
		<TableContainer component={Paper}>
			{rows.length == 0 ? (
				<Typography sx={TableStyles.noContentStyle}>
					No records to display
				</Typography>
			) : (
				<Table sx={{ minWidth: 650 }} aria-label='sample table'>
					<TableHeadComponent headerLabels={newHeaderLabels} />
					<TableBody>
						{rows.map((row, index) => (
							<TableRowComponent key={index} cells={row.cells} actions={actions} />
						))}
					</TableBody>
				</Table>
			)}
		</TableContainer>
	);
}
