import { Box } from "@mui/material"
import LoginForm from "../../organisms/LoginForm/LoginForm"
import { COMPANY_NAME } from "../../../config/constants"

function LoginTemplate( ) {
    return (
        <Box sx={{textAlign: "center"}}>
            <h1>{COMPANY_NAME}</h1>
            <LoginForm />
        </Box>
    );
}

export default LoginTemplate;
