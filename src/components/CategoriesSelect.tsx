import {
  Autocomplete,
  TextField,
  createFilterOptions,
  styled,
} from "@mui/material";
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

interface CategoriesSelectProps {
  values: CategoryType[];
  onChange: (values: CategoryType[]) => void;
}

export const CategoriesSelect = ({
  values,
  onChange,
}: CategoriesSelectProps) => {
  const { categories } = useCategories();

  return (
    <StyledWrapper>
      <StyledInnerWrapper>
        <Autocomplete
          renderInput={(params) => (
            <TextField {...params} placeholder="Select" hiddenLabel />
          )}
          onChange={(_, values) => {
            const lastValue = values[values.length - 1];

            if (typeof lastValue === "string" && !!lastValue) {
              const oldValues = values.slice(0, -1) as CategoryType[];
              if (oldValues.some((e) => e.name === lastValue)) return;
              onChange([...oldValues, { name: lastValue }]);
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
          renderOption={(props, option) => <li {...props}>{option.name}</li>}
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
