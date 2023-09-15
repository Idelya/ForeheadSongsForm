import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Button, TextField, Typography, styled } from "@mui/material";
import { CategoriesSelect } from "./CategoriesSelect";
import { saveSong } from "../api/writeData";
import { CategoryType } from "../types";

interface SongFormValues {
  title: string;
  source: string;
  lyrics: string;
  categories: CategoryType[];
}

const initialValues: SongFormValues = {
  title: "",
  source: "",
  lyrics: "",
  categories: [],
};

const StyledWrapper = styled("div")({
  display: "flex",
  gap: "10px",
  flexDirection: "column",
});

const SongForm: React.FC = () => {
  const handleSubmit = (values: SongFormValues) => {
    saveSong(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue, ...props }) => (
        <Form>
          <StyledWrapper>
            <TextField
              name="title"
              label="Title"
              fullWidth
              variant="outlined"
              margin="dense"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              helperText={<ErrorMessage name="name" />}
              error={!!(props.errors.title && props.touched.title)}
              required
            />
            <TextField
              name="source"
              label="Source"
              fullWidth
              variant="outlined"
              margin="dense"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              helperText={<ErrorMessage name="source" />}
              error={!!(props.errors.source && props.touched.source)}
              required
            />
            <TextField
              name="lyrics"
              label="Lyrics"
              fullWidth
              variant="outlined"
              margin="dense"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              helperText={<ErrorMessage name="lyrics" />}
              multiline
              rows={4}
              error={!!(props.errors.lyrics && props.touched.lyrics)}
              required
            />
            <Typography>
              Select the categories this song fits into or add a new one:
            </Typography>
            <CategoriesSelect
              values={values.categories}
              onChange={(e) => setFieldValue("categories", e)}
            />

            <Button variant="contained" type="submit" color="primary" fullWidth>
              Submit
            </Button>
          </StyledWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default SongForm;
