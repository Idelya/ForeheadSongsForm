import {
  Container,
  CssBaseline,
  Divider,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import SongForm from "./components/SongForm";

const StyledPaper = styled(Paper)({
  display: "flex",
  gap: "10px",
  padding: "32px 16px",
  flexDirection: "column",
});

const StyledMain = styled("main")({
  backgroundColor: "#dcf4d8",
  padding: "30px 0px",
});

const StyledDivider = styled(Divider)({
  marginTop: "30px",
});

function App() {
  return (
    <div>
      <CssBaseline />
      <StyledMain>
        <Container>
          <StyledPaper elevation={3}>
            <Typography component="h1" variant="h3">
              Piosenki do czółka
            </Typography>
            <br />
            <Typography>
              Szukamy piosenek do nasze (<i>lepszej</i>) wersji czółka. Jest to
              wersja gry na nucenie - przypomina ona kalambury, ale zamiast
              pokazywania jest nucenie.
              <br /> <br />
              Dobra piosenka dla czółka to taka która jest w miarę znana i która
              ma w sobie coś charakterystycznego. Trudno zgadywać piosenki kiedy
              każda z nich brzmi tak samo :) Im więcej haseł tym lepsza zabawa,
              dlatego dodawajcie swoje propozycje.
              <br /> <br />
              Dodając postarajcie się uważać na ortografię. W ten sposób
              aplikacja <i>może</i> wykryje jeżeli dana piosenka już istnieje.{" "}
              <br />
              Nie dodawajcie proszę głupot. Nie zamierzamy przeglądać haseł,
              żeby też moć zagrać. <br />
              To oznacza że to
              <b> WY kontrolujecie poprawność dodawanych haseł. </b>.
              <br />
              <br />W miarę możliwości dla piosenek z bajek podawajcie polskie
              tłumaczenie (ze względu na duplikaty).
            </Typography>
            <StyledDivider />
            <SongForm />
          </StyledPaper>
        </Container>
      </StyledMain>
    </div>
  );
}

export default App;
