import {ChangeEvent, useState} from "react";
import {Navigate} from "react-router-dom";
import {FormControl, Button, Box, FormHelperText} from "@mui/material";

import {getUserByUserNameAndPassword} from "../../../Services/userService";
import TextField from "../../Atoms/TextField/TextField";
import {useCookies} from "../../../Utils/Hooks/useCookies";
import {requiredField} from "../../../Utils/Constants/form/validations";
import {
  LOGIN_FORM_REQUIRED_FIELD_ERROR,
  LOGIN_FORM_SIGN_IN,
} from "../../../Utils/Constants/pages/login";
import {LoginFormProps} from "./Types";
import {LoginFormStyles} from "./LoginFormStyles";

function LoginForm({fields}: LoginFormProps): React.ReactElement {
  const [fieldsValues, setFieldsValues] = useState<{[key: string]: string}>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const cookies = useCookies();

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name;
    setFieldsValues((prevFieldsValues) => ({
      ...prevFieldsValues,
      [field]: event.target.value,
    }));
    resetTextFieldError(field);
  };

  const buildParametersObject = (fields: {[key: string]: string}) => {
    const parameters: {[key: string]: string} = {};
    Object.keys(fields).forEach((key) => {
      parameters[key] = fields[key].trim();
    });
    return parameters;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const requestParameters = buildParametersObject(fieldsValues);
      const response = await getUserByUserNameAndPassword(requestParameters);
      if (response.length > 0) {
        cookies?.set("userData", response, {path: "/"});
        setIsLoggedIn(true);
      } else {
        setErrors({form: LOGIN_FORM_REQUIRED_FIELD_ERROR});
      }
    } catch (error) {
      setErrors({form: (error as unknown as Error).message});
    }
  };

  const getFieldRequiredValue = (field: string): boolean | undefined => {
    return fields.find((item) => item.name === field)?.required;
  };

  const handleBlur = (field: string) => {
    if (!field) return;
    if (
      !errors[field] &&
      !fieldsValues[field] &&
      getFieldRequiredValue(field)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: requiredField(field),
      }));
    }
  };

  const resetTextFieldError = (field: string) => {
    const newErrors = {...errors};
    delete newErrors[field];
    setErrors(newErrors);
  };

  return (
    <Box sx={LoginFormStyles.container}>
      {isLoggedIn ? (
        <Navigate to="/admin" />
      ) : (
        <form onSubmit={handleSubmit}>
          <Box sx={LoginFormStyles.form}>
            {fields.map((fieldItem) => (
              <FormControl
                required={fieldItem.required}
                error={!!errors[fieldItem.name]}
                key={fieldItem.name}
              >
                <TextField
                  name={fieldItem.name}
                  label={fieldItem.label}
                  variant="outlined"
                  type={fieldItem.type}
                  value={fieldsValues[fieldItem.name]?.trim() || ""}
                  onChange={handleFieldChange}
                  onBlur={() => handleBlur(fieldItem.name)}
                  required={fieldItem.required}
                  error={!!errors[fieldItem.name]}
                />
                {errors[fieldItem.name] && (
                  <FormHelperText>{errors[fieldItem.name]}</FormHelperText>
                )}
              </FormControl>
            ))}
            {errors["form"] && (
              <FormHelperText sx={{color: "red"}}>
                {errors["form"]}
              </FormHelperText>
            )}
            <Button type="submit" variant="contained" color="primary">
              {LOGIN_FORM_SIGN_IN}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
}

export default LoginForm;
