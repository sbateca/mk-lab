export interface LoginFormProps {
    fields: FieldItemProps[];
}

interface FieldItemProps{
    name: string;
    label: string;
    type: "text" | "password";
    required: boolean;
}
