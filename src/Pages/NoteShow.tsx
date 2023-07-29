import React from 'react';
import { useNote } from './NoteLayout';
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
          <h1>{note.title}</h1>
          <Stack gap={1} direction='horizontal' className='flex-wrap'>
              {note.tags.map(tag => (
                <Badge key={tag.id} className='text-truncate'>{tag.label}</Badge>
              ))}
            </Stack>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction='horizontal'>
            <Link to={`/${note.id}/edit`}>
              <Button variant='primary'>Edit</Button>
            </Link>
            <Button variant='outline-danger' onClick={() => {
              onDeleteNote(note.id)
              navigate("/")
            }}>Delete</Button>
            <Link to="..">
              <Button variant='outline-secondary'>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </div>
  );
}

export default NoteShow;