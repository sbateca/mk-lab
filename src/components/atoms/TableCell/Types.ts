import {ActionsButtonsComponentProps} from "../../Molecules/ActionButton/Types";

export interface TableCellProps {
  key?: number;
  text: string;
  align: "center" | "inherit" | "justify" | "left" | "right";
  actions?: ActionsButtonsComponentProps | null;
  index?: number;
}
