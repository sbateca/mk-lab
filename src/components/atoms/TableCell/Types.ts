export interface TableCellProps {
    key?: number,
    text: string,
    align: "center"
    | "inherit"
    | "justify"
    | "left"
    | "right",
    actions?: boolean,
    index?: number
}
