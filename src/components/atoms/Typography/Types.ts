type TypographyVariant =
  | "body2"
  | "button"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "inherit";

type TypographyColor =
  | "black"
  | "error"
  | "primary"
  | "secondary"
  | "textPrimary"
  | "textSecondary";

interface ITypographyProps {
  text: string;
  size?: string;
  padding?: string;
  variant: TypographyVariant;
  paragraph?: boolean;
  gutterBottom?: boolean;
  align?: "inherit" | "left" | "right" | "center" | "justify";
  color?: TypographyColor;
}

export default ITypographyProps;
