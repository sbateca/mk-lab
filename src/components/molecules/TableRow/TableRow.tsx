import {useEffect, useState} from "react";
import {TableRow as MuiTableRow} from "@mui/material";

import TableCell from "../../Atoms/TableCell/TableCell";
import {TableRowProps} from "./Types";

function TableRow({cells, actionButtons}: TableRowProps): React.ReactElement {
  const [newCells, setNewCells] = useState(cells);
  useEffect(() => {
    if (actionButtons) {
      setNewCells([{text: "", align: "center"}, ...cells]);
    }
  }, [actionButtons]);

  return (
    <MuiTableRow>
      {newCells.map((cell, index) => {
        return actionButtons ? (
          <TableCell
            key={index}
            align={cell.align}
            text={cell.text}
            actionButtons={actionButtons}
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
