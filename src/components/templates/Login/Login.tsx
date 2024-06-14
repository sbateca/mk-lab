import {Box} from "@mui/material";

import LoginForm from "../../organisms/LoginForm/LoginForm";
import {LoginTemplateStyles} from "./LoginTemplateStyles";
import {COMPANY_NAME} from "../../../utils/constants/pages/admin";
import {LOGIN_FORM_FIELDS} from "../../../utils/constants/pages/login";

function LoginTemplate(): React.ReactElement {
  return (
    <Box sx={LoginTemplateStyles}>
      <h1>{COMPANY_NAME}</h1>
      <LoginForm fields={LOGIN_FORM_FIELDS} />
    </Box>
  );
}

export default LoginTemplate;
