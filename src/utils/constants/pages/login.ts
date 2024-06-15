export const LOGIN_FORM_SIGN_IN = "Sign In";
export const LOGIN_FORM_FIELDS = [
  {
    name: "username",
    label: "Username",
    type: "text" as const,
    isRequired: true,
  },
];
export const LOGIN_ERROR_ACCESS_DENIED_MESSAGE =
  "Access to this resource is denied. Please contact the administrator.";
