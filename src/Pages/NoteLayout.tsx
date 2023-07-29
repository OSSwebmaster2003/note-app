import React from 'react';
import { Note } from '../App';
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router';

type NoteLayoutProps = {
  notes : Note[]
}

function NoteLayout({notes} : NoteLayoutProps) {
  const {id} = useParams()
  const note = notes.find(n => n.id === id)

  if(note === null) return <Navigate to={`/`} replace/>
  return (
    <Outlet context={note} />
  );
}

export default NoteLayout;

export function useNote(){
  return useOutletContext<Note>()
}