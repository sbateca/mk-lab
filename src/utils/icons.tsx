import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const getIcon = (icon: string) => {
  switch (icon) {
    case "view":
      return <SearchIcon />;
    case "edit":
      return <EditIcon />;
    case "create":
      return <AddIcon />;
    case "delete":
      return <DeleteIcon />;
    default:
      return "";
  }
};
