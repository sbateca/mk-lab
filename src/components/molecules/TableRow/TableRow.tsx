import {TableRow as MuiTableRow} from "@mui/material";

import TableCell from "../TableCell/TableCell";
import {TableRowProps} from "./Types";
import SampleTableActionButtons from "../TableActionButtons/SampleTableActionButtons";
import {useMenu} from "../../../utils/hooks/useMenu";
import ReportTableActionButtons from "../TableActionButtons/ReportTableActionButtons";
import {SharedMenuItems} from "../../../utils/enums";

function TableRow({id, cells}: TableRowProps): React.ReactElement {
  const {selectedMenuItem} = useMenu();

  const getActionButtons = (): React.ReactElement => {
    switch (selectedMenuItem) {
      case SharedMenuItems.SAMPLES:
        return <SampleTableActionButtons sampleId={id ?? ""} />;
      case SharedMenuItems.REPORTS:
        return <ReportTableActionButtons reportId={id ?? ""} />;
      default:
        return <></>;
    }
  };
  return (
    <MuiTableRow>
      {cells.map((cell, index) => {
        return (
          <TableCell key={`table-cell-${index.toString()}`} align={cell.align}>
            {cell.children}
          </TableCell>
        );
      })}
      <TableCell align={"left"}>{getActionButtons()}</TableCell>
    </MuiTableRow>
  );
}

export default TableRow;
