import {useEffect, useState} from "react";
import {
  Paper,
  Typography,
  Table as MuiTable,
  TableBody,
  TableContainer,
} from "@mui/material";

import TableHead from "../../Molecules/TableHead/TableHead";
import TableRow from "../../Molecules/TableRow/TableRow";
import {TableProps} from "./Types";
import {TableStyles} from "./TableStyles";

function Table({
  headerLabels,
  rows,
  actionButtons,
}: TableProps): React.ReactElement {
  const [newHeaderLabels, setNewHeaderLabels] = useState(headerLabels);

  useEffect(() => {
    if (actionButtons) {
      setNewHeaderLabels(["Actions", ...headerLabels]);
    }
  }, [actionButtons]);

  return (
    <TableContainer component={Paper}>
      {rows.length === 0 ? (
        <Typography sx={TableStyles.noContentStyle}>
          No records to display
        </Typography>
      ) : (
        <MuiTable sx={{minWidth: 650}} aria-label="sample table">
          <TableHead headerLabels={newHeaderLabels} />
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                cells={row.cells}
                actionButtons={actionButtons}
              />
            ))}
          </TableBody>
        </MuiTable>
      )}
    </TableContainer>
  );
}

export default Table;
