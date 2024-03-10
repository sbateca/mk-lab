export interface ActionsButtonsComponentProps {
    actions: ActionsButtonsProps[];
}

export interface ActionsButtonsProps {
	action: string;
	color: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit" | "default";
}
