import {Box} from "@mui/material";

import LoginForm from "../../Organisms/LoginForm/LoginForm";
import {LoginTemplateStyles} from "./LoginTemplateStyles";
import {COMPANY_NAME} from "../../../Config/constants";

function LoginTemplate(): React.ReactElement {
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
    },
  ];

  return (
    <Box sx={LoginTemplateStyles}>
      <h1>{COMPANY_NAME}</h1>
      <LoginForm fields={fieldItems} />
    </Box>
  );
}

export default LoginTemplate;
