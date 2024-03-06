export interface TexFieldProps {
	label: string;
	variant: "standard" | "outlined" | "filled";
	type: "text" | "password";
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	required: boolean;
}
