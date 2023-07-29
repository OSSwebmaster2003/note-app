import React, { useState, useMemo } from 'react';
import { Badge, Button, Card, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from "react-select"
import { Tag } from '../App';
import "./noteList.css"

type SimplifiedNote = {
  tags : Tag[],
  title : string,
  id : string
}

type NoteListProps = {
  availableTags : Tag[],
  notes : SimplifiedNote[]
}

function NoteList({availableTags , notes } : NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

  return (
    <div>
      <Row className='align-items-center mb-4'>
        <Col><h1>Notes</h1></Col>
        <Col xs="auto">
          <Stack gap={2} direction='horizontal'>
            <Link to="/new">
              <Button variant='primary'>Create</Button>
            </Link>
            <Button variant='outline-secondary'>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type='text' />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => (
                  {label : tag.label , value : tag.id}
                ))}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                options={availableTags.map((option) => (
                  {label : option.label , value : option.id}
                ))}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default NoteList;

function NoteCard({id , title , tags}:SimplifiedNote){
  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none super__card`}>
      <Card.Body>
        <Stack gap={2} className='align-items-center justify-content-center h-100'>
          <span className='fs-5'>{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction='horizontal' className='justify-content-center flex-wrap'>
              {tags.map(tag => (
                <Badge key={tag.id} className='text-truncate'>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}