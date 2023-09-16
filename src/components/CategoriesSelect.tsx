import { Autocomplete, TextField, Typography, styled } from "@mui/material";
import { CardOptions } from "./CardOptions";
import { useCategories } from "../api/getData";
import { CategoryType } from "../types";

const StyledWrapper = styled("div")({
  display: "flex",
  gap: "10px",
  flexDirection: "column",
});

const StyledInnerWrapper = styled("div")({
  display: "flex",
  gap: "10px",
});

const StyledListItem = styled("li")({
  textTransform: "capitalize",
});

interface CategoriesSelectProps {
  values: CategoryType[];
  loading: boolean;
  onChange: (values: CategoryType[]) => void;
}

export const CategoriesSelect = ({
  values,
  loading,
  onChange,
}: CategoriesSelectProps) => {
  const { categories } = useCategories(loading);

  return (
    <StyledWrapper>
      <StyledInnerWrapper>
        <Autocomplete
          renderInput={(params) => (
            <TextField {...params} placeholder="Select" hiddenLabel />
          )}
          onChange={(_, values, reason) => {
            if (reason === "removeOption") return;
            const lastValue = values[values.length - 1];

            if (typeof lastValue === "string" && !!lastValue) {
              const lastValueLower = lastValue.toLowerCase();
              const oldValues = values.slice(0, -1) as CategoryType[];
              if (oldValues.some((e) => e.name === lastValueLower)) return;
              const existingCategory = categories.find(
                (e) => e.name === lastValueLower
              );
              if (existingCategory) {
                onChange([...oldValues, existingCategory]);
                console.log("existingCategory");
                return;
              }
              onChange([...oldValues, { name: lastValueLower }]);
            } else {
              onChange(values as CategoryType[]);
            }
          }}
          getOptionLabel={(option) => {
            if (typeof option === "string") {
              return option;
            }
            return option.name;
          }}
          disablePortal
          multiple
          filterSelectedOptions
          renderOption={(props, option) => (
            <StyledListItem {...props}>{option.name}</StyledListItem>
          )}
          value={values || []}
          disableClearable
          renderTags={() => ""}
          freeSolo
          fullWidth
          options={categories}
        />
      </StyledInnerWrapper>
      <Typography>{`Wybrano kategori: ${values.length}`}</Typography>
      <CardOptions
        values={values || []}
        onDelete={(option) =>
          onChange(
            values.filter((e) =>
              option.id ? e.id !== option.id : e.name !== option.name
            )
          )
        }
      />
    </StyledWrapper>
  );
};
