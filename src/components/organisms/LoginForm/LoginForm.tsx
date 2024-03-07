import { ChangeEvent, useState } from "react"
import { Navigate } from "react-router-dom"
import { FormControl, Button, Box, FormHelperText } from "@mui/material"

import { getUserByUserNameAndPassword } from "../../../services/userService"
import { LoginFormStyles } from "./LoginFormStyles"
import TextFieldComponent from "../../atoms/TextField/TextField"
import { useCookies } from "../../../utils/hooks/useCookies"

function LoginForm() {
	const [fieldsValues, setFieldsValues] = useState<{ [key: string]: string }>({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const cookies = useCookies();

	const fieldItems = [
		{
			name: "username",
			label: "Username",
			type: "text" as const,
		},
		{
			name: "password",
			label: "Password",
			type: "password" as const,
		}
	]

	const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
		const field = event.target.name;
		setFieldsValues((prevFieldsValues) => ({
			...prevFieldsValues,
			[field]: event.target.value,
		}));
		resetTextFieldError(field);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			console.log(fieldsValues["username"], fieldsValues["password"]);
			const response = await getUserByUserNameAndPassword({
				username: fieldsValues["username"],
				password: fieldsValues["password"],
			});
			if (response.length > 0) {
				cookies?.set("userData", response, { path: "/" });
				setIsLoggedIn(true);
			} else {
				setErrors({ form: "email or password incorrect, please try again." });
			}
		} catch (error) {
			setErrors({ form: "something happened when try to get data." });
		}
	};

	const handleBlur = (field: string) => {
		if (!field) return;
		if (!errors[field] && !fieldsValues[field]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[field]: `${field} is required`,
			}));
		}
	};

	const resetTextFieldError = (field: string) => {
		const newErrors = { ...errors };
		delete newErrors[field];
		setErrors(newErrors);
	};

	return (
		<Box sx={LoginFormStyles.container}>
			{isLoggedIn ? (
				<Navigate to='/admin' />
			) : (
				<form onSubmit={handleSubmit}>
					<Box
						sx={LoginFormStyles.form}
					>
						{fieldItems.map((fieldItem) => (
							<FormControl required error={!!errors[fieldItem.name]} key={fieldItem.name}>
								<TextFieldComponent
									name={fieldItem.name}
									label={fieldItem.label}
									variant='outlined'
									type={fieldItem.type}
									value={fieldsValues[fieldItem.name] || ""}
									onChange={handleFieldChange}
									onBlur={() => handleBlur(fieldItem.name)}
									required
									error={!!errors[fieldItem.name]}
								/>
								{errors[fieldItem.name] && <FormHelperText>{errors[fieldItem.name]}</FormHelperText>}
							</FormControl>
						))}
						{errors["form"] && <FormHelperText>{errors["form"]}</FormHelperText>}
						<Button type='submit' variant='contained' color='primary'>
							Log in
						</Button>
					</Box>
				</form>
			)}
		</Box>
	);
}

export default LoginForm;
