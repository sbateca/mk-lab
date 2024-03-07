import { TextField } from "@mui/material";
import { TexFieldProps } from "./Types";

function TextFieldComponent({ name, label, variant, type, value, onChange, onBlur: onBlur, required, error }: TexFieldProps) {
	return required ? (
		<TextField name={name} label={label} variant={variant} type={type} value={value} onChange={onChange} onBlur={onBlur} error={error} required />
	) : (
		<TextField name={name} label={label} variant={variant} type={type} value={value} onChange={onChange} onBlur={onBlur} error={error} />
	);
}

export default TextFieldComponent;
