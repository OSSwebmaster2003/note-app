import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import NewNote from "./Pages/NewNote";
import './App.css';

export type Note = {
  id : string
} & NoteData

export type NoteData = {
  title : string,
  markdown : string,
  tags : Tag[]
}
export type Tag = {
  id : string,
  label : string
}

function App() {
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Hi</h1>} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
