import { Box } from "@mui/material"

import LoginForm from "../../organisms/LoginForm/LoginForm"
import { COMPANY_NAME } from "../../../config/constants"
import { loginTemplateStyles } from "./LoginTemplateStyles"

function LoginTemplate( ) {
    const fieldItems = [
		{
			name: "username",
			label: "Username",
			type: "text" as const,
			required: true,
		},
		{
			name: "password",
			label: "Password",
			type: "password" as const,
			required: true,
		}
	]

    return (
        <Box sx={loginTemplateStyles}>
            <h1>{COMPANY_NAME}</h1>
            <LoginForm fields={fieldItems} />
        </Box>
    );
}

export default LoginTemplate;
