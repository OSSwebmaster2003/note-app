import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import NewNote from "./Pages/NewNote";
import { useState , useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid"
import NoteList from "./Pages/NoteList";
import './App.css';
import NoteLayout from "./Pages/NoteLayout";
import NoteShow from "./Pages/NoteShow";
import NoteEdit from "./Pages/NoteEdit";

export type Note = {
  id : string
} & NoteData
export type RawNote = {
  id : string
} & RawNoteData
export type RawNoteData = {
  title : string,
  markdown : string,
  tagIds : string[]
}
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
  const [notes , setNotes] = useLocalStorage<RawNote[]>("NOTES" , [])
  const [tags , setTags] = useLocalStorage<Tag[]>("TAGS" , [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  const onCreateNote = ({tags , ...data} : NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes , {...data , id : uuidV4() , tagIds : tags.map((tag) => tag.id)}]
    })
  }

  const addTag = (tag : Tag) => {
    setTags(prev => [...prev , tag])
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id:string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(notes => notes.id !== id)
    })
  }

  const updateTag = (id : string , label : string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if(tag.id === id){
          return {...tag , label}
        }else{
          return tag
        }
      })
    })
  }

  const deleteTag = (id : string) => {
    setTags(prevTags => {
      return prevTags.filter(tags => tags.id !== id)
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} updateTag={updateTag} deleteTag={deleteTag} />} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag = {addTag} availableTags = {tags} />} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
          <Route index element={<NoteShow onDeleteNote={onDeleteNote} />} />
          <Route path="edit" element={<NoteEdit onSubmit={onUpdateNote} onAddTag = {addTag} availableTags = {tags} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
