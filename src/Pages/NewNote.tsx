import React from 'react';
import NoteForm from '../Components/NoteForm';
import { NoteData, Tag } from '../App';

type NewNoteProps = {
  onSubmit : (data : NoteData) => void,
  onAddTag : (tag : Tag) => void,
  availableTags : Tag[]
}
function NewNote({onSubmit , onAddTag , availableTags} : NewNoteProps) {
  return (
    <div>
      <h1 className='mb-4 notes__title'>New Note</h1>
      <NoteForm 
        onSubmit={onSubmit} 
        onAddTag={onAddTag} 
        availableTags={availableTags} 
      />
    </div>
  );
}

export default NewNote;