import {ButtonConfigs} from "../../Molecules/ActionButtons/Types";

export interface TableCellProps {
  key?: number;
  text: string;
  align: "center" | "inherit" | "justify" | "left" | "right";
  actionButtons?: ButtonConfigs | null;
  index?: number;
}
