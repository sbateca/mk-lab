export interface DialogProps {
  isOpen: boolean;
  dialogTitle: string;
  children: React.ReactNode;
  dialogActions: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  onClose: () => void;
}
