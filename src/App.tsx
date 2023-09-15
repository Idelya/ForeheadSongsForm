import { Container, Typography } from "@mui/material";
import SongForm from "./components/SongForm";

function App() {
  return (
    <Container>
      <main>
        <Typography component="h1" variant="h3">
          Piosenki do czółka
        </Typography>
        <SongForm />
      </main>
    </Container>
  );
}

export default App;
