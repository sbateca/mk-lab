export interface ButtonConfig {
  label: string;
  variant: "text" | "outlined" | "contained";
  size: "small" | "medium" | "large";
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
  onClick?: () => void;
}
