import React from 'react';
import NoteForm from '../Components/NoteForm';
import { NoteData } from '../App';

type NewNoteProps = {
  onSubmit : (data : NoteData) => void
}
function NewNote({onSubmit} : NewNoteProps) {
  return (
    <div>
      <h1 className='mb-4'>New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </div>
  );
}

export default NewNote;