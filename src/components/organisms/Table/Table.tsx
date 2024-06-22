import {
  Paper,
  Typography,
  Table as MuiTable,
  TableBody,
  TableContainer,
} from "@mui/material";

import TableHead from "../../molecules/TableHead/TableHead";
import TableRow from "../../molecules/TableRow/TableRow";
import {NO_RECORDS_MESSAGE} from "../../../utils/constants/pages/shared";
import {TableProps} from "./Types";
import {TableStyles} from "./TableStyles";

function Table({headerLabels, rows}: TableProps): React.ReactElement {
  return (
    <TableContainer component={Paper}>
      {rows.length === 0 ? (
        <Typography sx={TableStyles.noContentStyle}>
          {NO_RECORDS_MESSAGE}
        </Typography>
      ) : (
        <MuiTable sx={{minWidth: 650}} aria-label="sample table">
          <TableHead headerLabels={headerLabels} />
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} cells={row.cells} />
            ))}
          </TableBody>
        </MuiTable>
      )}
    </TableContainer>
  );
}

export default Table;
