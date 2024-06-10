export interface ButtonConfigs {
  buttonConfigs: ButtonConfig[];
}

export interface ButtonConfig {
  label: string;
  color:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit"
    | "default";
  icon?: "view" | "edit" | "create" | "delete";
}
