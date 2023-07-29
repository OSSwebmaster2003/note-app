import React from 'react';
import { useNote } from './NoteLayout';
import { Badge, Col, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type NoteProps = {
  onDeleteNote : (id:string) => void
}

function NoteShow({onDeleteNote} : NoteProps) {
  const navigate = useNavigate()
  const note = useNote()
  return (
    <div>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1 className='notes__title'>{note.title}</h1>
          <Stack gap={1} direction='horizontal' className='flex-wrap'>
              {note.tags.map(tag => (
                <Badge key={tag.id} className='text-truncate'>{tag.label}</Badge>
              ))}
            </Stack>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction='horizontal'>
            <Link to={`/${note.id}/edit`}>
              <button className='primary__button'>Edit</button>
            </Link>
            <button className='danger__button' onClick={() => {
              onDeleteNote(note.id)
              navigate("/")
            }}>Delete</button>
            <Link to="..">
              <button className='secondary__button'>Back</button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown className='note__text'>{note.markdown}</ReactMarkdown>
    </div>
  );
}

export default NoteShow;