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
import * as yup from "yup";
import { saveSong } from "../api/writeData";
import { CategoryType } from "../types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  marginTop: "10px",
  gap: "10px",
  flexDirection: "column",
});

const StyledFormWrapper = styled("div")({
  marginTop: "24px",
});

const StyledErrorMessage = styled("p")({
  color: "#d32f2f",
});

const validationSchema = yup.object({
  title: yup
    .string()
    .required("Tytuł piosenki jest wymagany.")
    .min(2, "co najmniej 2 znaki")
    .max(50, "co najwyżej 50 znaków"),
  source: yup
    .string()
    .required("Autor jest wymagany")
    .min(2, "co najmniej 2 znaki")
    .max(30, "co najwyżej 30 znaków"),
  lyrics: yup
    .string()
    .required("Tekst piosenki jest wymagany")
    .max(250, "co najwyżej 250 znaków")
    .min(15, "co najmniej 15 znaków"),
  categories: yup.array().min(1, "co najmniej jedna kategoria jest wymagana"),
});

const SongForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: SongFormValues, { resetForm }) => {
    setLoading(true);
    try {
      const { countExisting, countAdded } = await saveSong({
        ...values,
        title: values.title.toLowerCase(),
        source: values.source.toLowerCase(),
        lyrics: values.lyrics.replace(/\n/g, "$"),
      });
      resetForm({ values: initialValues });
      toast.success(
        `Dodano piosenkę ${values.title} do ${countAdded} kategorii. Istniała już w ${countExisting} kategorii.`,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
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
    <StyledFormWrapper>
      <Typography component="h2" variant="h4">
        Formularz
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
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
                helperText={<ErrorMessage name="title" />}
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
                Możesz również dodać nową kategorię klikając enter.
              </Typography>
              <CategoriesSelect
                values={values.categories}
                loading={loading}
                onChange={(e) => setFieldValue("categories", e)}
              />
              <StyledErrorMessage>
                <ErrorMessage name="categories" />
              </StyledErrorMessage>

              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Zapisz
              </Button>
            </StyledWrapper>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </StyledFormWrapper>
  );
};

export default SongForm;
