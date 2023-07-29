import React from 'react';
import { NoteData, Tag } from '../App';
import NoteForm from '../Components/NoteForm';
import { useNote } from './NoteLayout';

type EditNoteProps = {
  onSubmit : (id : string , data : NoteData) => void
  onAddTag : (tag : Tag) => void
  availableTags : Tag[]
}

function NoteEdit({onSubmit , onAddTag , availableTags} : EditNoteProps) {
  const note = useNote()
  return (
    <div>
      <h1 className='mb-4'>Edit Note</h1>
      <NoteForm 
        title = {note.title}
        markdown = {note.markdown}
        tags={note.tags}
        onSubmit={data => onSubmit(note.id , data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
}

export default NoteEdit;