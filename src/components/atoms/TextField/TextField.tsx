import { TextField } from "@mui/material";
import { TexFieldProps } from "./Types";

function TextFieldComponent({ label, variant, type, value, onChange, required }: TexFieldProps) {
	return required ? (
		<TextField label={label} variant={variant} type={type} value={value} onChange={onChange} required />
	) : (
		<TextField label={label} variant={variant} type={type} value={value} onChange={onChange} />
	);
}

export default TextFieldComponent;
