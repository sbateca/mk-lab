export const LOGIN_FORM_SIGN_IN = "Sign In";
export const LOGIN_FORM_FIELDS = [
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
export const LOGIN_FORM_REQUIRED_FIELD_ERROR =
  "Email or password incorrect, please try again.";
