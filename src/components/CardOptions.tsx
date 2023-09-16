import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CategoryType } from "../types";

const StyledList = styled(List)({
  display: "flex",
  flexWrap: "wrap",
  gap: "5px",
  paddingTop: 0,
  paddingBottom: 0,
});

const StyledListItem = styled(ListItem)({
  borderRadius: "6px",
  border: "1px solid rgb(0, 0, 0, 0.23)",
  height: "28px",
  padding: "2px 48px 2px 16px",
  width: "fit-content",
  textTransform: "capitalize",
});

const StyledIconButton = styled(IconButton)({
  width: "16px",
  height: "16px",
  padding: "0 5px 0 0",
  "& *": {
    width: "100%",
    height: "100%",
  },
});

interface CardOptionsProps {
  values: CategoryType[];
  onDelete: (value: CategoryType) => void;
}
export const CardOptions = ({ values, onDelete }: CardOptionsProps) => (
  <StyledList>
    {values.map((val) => (
      <StyledListItem
        key={val.name}
        secondaryAction={
          <StyledIconButton
            disableTouchRipple
            disableRipple
            disableFocusRipple
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(val)}
          >
            <CloseIcon />
          </StyledIconButton>
        }
      >
        <ListItemText primary={val.name} />
      </StyledListItem>
    ))}
  </StyledList>
);
