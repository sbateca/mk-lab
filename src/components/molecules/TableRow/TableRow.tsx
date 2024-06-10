import {useEffect, useState} from "react";
import {TableRow as MuiTableRow} from "@mui/material";

import TableCell from "../TableCell/TableCell";
import {TableRowProps} from "./Types";

function TableRow({cells, buttonConfigs}: TableRowProps): React.ReactElement {
  const [cellsWithButtonsCell, setCellsWithButtonsCell] = useState(cells);
  useEffect(() => {
    if (buttonConfigs) {
      setCellsWithButtonsCell([{text: "", align: "center"}, ...cells]);
    }
  }, [buttonConfigs, cells]);

  return (
    <MuiTableRow>
      {cellsWithButtonsCell.map((cell, index) => {
        return buttonConfigs ? (
          <TableCell
            key={index}
            align={cell.align}
            text={cell.text}
            buttonConfigs={buttonConfigs}
            index={index}
          />
        ) : (
          <TableCell key={index} align={cell.align} text={cell.text} />
        );
      })}
    </MuiTableRow>
  );
}

export default TableRow;
