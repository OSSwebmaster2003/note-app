import React from 'react';
import NoteForm from '../Components/NoteForm';

function NewNote() {
  return (
    <div>
      <h1 className='mb-4'>New Note</h1>
      <NoteForm />
    </div>
  );
}

export default NewNote;