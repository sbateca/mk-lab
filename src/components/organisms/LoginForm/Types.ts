export interface LoginFormProps {
  fields: FieldProps[];
}

interface FieldProps {
  name: string;
  label: string;
  type: "text" | "password";
  required: boolean;
}
