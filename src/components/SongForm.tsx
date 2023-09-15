import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  styled,
} from "@mui/material";
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: SongFormValues, { resetForm }) => {
    setLoading(true);
    try {
      await saveSong(values);
      resetForm({ values: initialValues });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <StyledWrapper>
        <CircularProgress />
      </StyledWrapper>
    );
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue, ...props }) => (
        <Form>
          <StyledWrapper>
            <TextField
              name="title"
              label="Tytuł piosenki"
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
              label="Autor lub film w którym występuje"
              fullWidth
              variant="outlined"
              margin="dense"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              helperText={<ErrorMessage name="source" />}
              error={!!(props.errors.source && props.touched.source)}
              required
            />
            <Typography>
              Podaj charakterystyczny fragment tekstu piosenki - aby łatwiej
              było uczestnikom przypomnieć sobie o którą piosenkę chodzi.
            </Typography>
            <TextField
              name="lyrics"
              label="Tekst"
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
              Podaj co najmniej jedną kategorię do której pasuje ta piosenka.{" "}
              <br />
              Możesz również dodać nową kategorię.
            </Typography>
            <CategoriesSelect
              values={values.categories}
              loading={loading}
              onChange={(e) => setFieldValue("categories", e)}
            />

            <Button variant="contained" type="submit" color="primary" fullWidth>
              Zapisz
            </Button>
          </StyledWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default SongForm;
