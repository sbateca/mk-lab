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
import {TABLE_ACTIONS_COLUMN_HEADER} from "../../../Utils/Constants/pages/shared";
import {TableProps} from "./Types";
import {TableStyles} from "./TableStyles";

function Table({
  headerLabels,
  rows,
  buttonConfigs,
}: TableProps): React.ReactElement {
  const [newHeaderLabels, setNewHeaderLabels] = useState(headerLabels);

  useEffect(() => {
    if (buttonConfigs) {
      setNewHeaderLabels([TABLE_ACTIONS_COLUMN_HEADER, ...headerLabels]);
    }
  }, [buttonConfigs, headerLabels]);

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
                buttonConfigs={buttonConfigs}
              />
            ))}
          </TableBody>
        </MuiTable>
      )}
    </TableContainer>
  );
}

export default Table;
