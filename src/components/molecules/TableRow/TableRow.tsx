import {useEffect, useState} from "react";
import {TableRow as MuiTableRow} from "@mui/material";

import TableCell from "../TableCell/TableCell";
import {TableRowProps} from "./Types";

function TableRow({cells}: TableRowProps): React.ReactElement {
  const [cellsWithButtonsCell, setCellsWithButtonsCell] = useState(cells);
  useEffect(() => {
    setCellsWithButtonsCell([{text: "", align: "center"}, ...cells]);
  }, [cells]);

  return (
    <MuiTableRow>
      {cellsWithButtonsCell.map((cell, index) => {
        return (
          <TableCell
            key={index}
            text={cell.text}
            align={cell.align}
            index={index}
          />
        );
      })}
    </MuiTableRow>
  );
}

export default TableRow;
