import {Box} from "@mui/material";

import {LoginForm} from "../../organisms";
import {COMPANY_NAME, LOGIN_FORM_FIELDS} from "../../../utils/constants";
import {LoginTemplateStyles} from "./LoginTemplateStyles";

export const LoginTemplate = (): React.ReactElement => {
  return (
    <Box sx={LoginTemplateStyles}>
      <h1>{COMPANY_NAME}</h1>
      <LoginForm fields={LOGIN_FORM_FIELDS} />
    </Box>
  );
};
