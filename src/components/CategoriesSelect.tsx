import { Autocomplete, TextField, styled } from "@mui/material";
import { CardOptions } from "./CardOptions";

const StyledWrapper = styled("div")({
  display: "flex",
  gap: "10px",
  flexDirection: "column",
});

const StyledInnerWrapper = styled("div")({
  display: "flex",
  gap: "10px",
});

const categories = ["Pop", "Rock", "Hip-Hop", "Country", "Jazz", "Other"];

interface CategoriesSelectProps {
  values: string[];
  onChange: (values: string[]) => void;
}
export const CategoriesSelect = ({
  values,
  onChange,
}: CategoriesSelectProps) => {
  return (
    <StyledWrapper>
      <StyledInnerWrapper>
        <Autocomplete
          renderInput={(params) => (
            <TextField {...params} placeholder="Select" hiddenLabel />
          )}
          onChange={(_, val) => {
            onChange(val as string[]);
          }}
          disablePortal
          multiple
          filterSelectedOptions
          value={values || []}
          disableClearable
          renderTags={() => ""}
          freeSolo
          fullWidth
          options={categories}
        />
      </StyledInnerWrapper>
      <CardOptions
        values={values || []}
        onDelete={(option) => onChange(values.filter((e) => e !== option))}
      />
    </StyledWrapper>
  );
};
