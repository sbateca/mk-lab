import ITypographyProps from "../../../Components/Atoms/Typography/Types";

export const getSharedPageTitleConfig = (
  pageName: string,
): ITypographyProps => {
  return {
    text: pageName,
    size: "20px",
    variant: "h1",
    padding: "10px 0px",
  };
};

export const TABLE_ACTIONS_COLUMN_HEADER = "Actions";
export const LOCAL_STORAGE_USER_KEY = "userData";
