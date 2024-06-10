import {ButtonConfigs} from "../ActionButtons/Types";

export interface TableCellProps {
  key?: number;
  text: string;
  align: "center" | "inherit" | "justify" | "left" | "right";
  buttonConfigs?: ButtonConfigs | null;
  index?: number;
}
