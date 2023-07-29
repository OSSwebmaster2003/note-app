import React, { useState, useMemo } from 'react';
import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
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
  deleteTag : (id:string) => void
  updateTag : (id:string , label : string) => void
}

type EditTagsModalProps = {
  show : boolean
  availableTags : Tag[]
  handleClose : () => void
  deleteTag : (id:string) => void
  updateTag : (id:string , label : string) => void
}

function NoteList({availableTags , notes , deleteTag , updateTag } : NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")
  const [editTagsModalOpen , setEditTagsModalOpen] = useState(false)

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
        <Col><h1 className='notes__title'>Notes</h1></Col>
        <Col xs="auto">
          <Stack gap={2} direction='horizontal'>
            <Link to="/new">
              <button className='primary__button'>Create</button>
            </Link>
            <button className='secondary__button' onClick={() => setEditTagsModalOpen(true)}>Edit Tags</button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label className='form__label'>Title</Form.Label>
              <Form.Control 
                className='form__input' 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                type='text'
                placeholder='search with title'
              />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="tags">
              <Form.Label className='form__label'>Tags</Form.Label>
              <ReactSelect
                className='form__select'
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
      <EditTagsModal 
        show={editTagsModalOpen} 
        handleClose={() => setEditTagsModalOpen(false)} 
        availableTags={availableTags}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </div>
  );
}

export default NoteList;

function NoteCard({id , title , tags}:SimplifiedNote){
  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none super__card form__card`}>
      <Card.Body>
        <Stack gap={2} className='align-items-center justify-content-center h-100'>
          <span className='fs-5 form__card__header'>{title}</span>
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

function EditTagsModal ({availableTags , show , handleClose , updateTag , deleteTag}: EditTagsModalProps){
  return (
    <Modal className='edit__modal' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control 
                    type='text' 
                    value={tag.label} 
                    onChange={e => updateTag(tag.id , e.target.value)} 
                  />
                </Col>
                <Col xs="auto">
                  <Button onClick={() => deleteTag(tag.id)} variant='outline-danger'>&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}