import {Box} from "@mui/material";

import LoginForm from "../../Organisms/LoginForm/LoginForm";
import {LoginTemplateStyles} from "./LoginTemplateStyles";
import {COMPANY_NAME} from "../../../Utils/Constants/pages/admin";
import {LOGIN_FORM_FIELDS} from "../../../Utils/Constants/pages/login";

function LoginTemplate(): React.ReactElement {
  return (
    <Box sx={LoginTemplateStyles}>
      <h1>{COMPANY_NAME}</h1>
      <LoginForm fields={LOGIN_FORM_FIELDS} />
    </Box>
  );
}

export default LoginTemplate;
