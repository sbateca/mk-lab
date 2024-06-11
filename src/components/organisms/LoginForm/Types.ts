export interface LoginFormProps {
  fields: FieldProps[];
}

export interface FieldProps {
  name: string;
  label: string;
  type: "text" | "password";
  required: boolean;
}
