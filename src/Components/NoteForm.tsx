import {Form, Stack, Row, Col, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import {useRef ,useState} from "react"
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "../App";
import {v4 as uuidV4} from "uuid"

type NoteFormProps = {
  onSubmit : (data: NoteData) => void,
  onAddTag : (tag : Tag) => void,
  availableTags : Tag[]
}

function NoteForm({onSubmit , onAddTag , availableTags} : NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags , setSelectedTags] = useState<Tag[]>([])

  const handleSubmit = (e:any) => {
    e.preventDefault()

    onSubmit({
      title : titleRef.current!.value,
      markdown : markdownRef.current!.value,
      tags : selectedTags
    })
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect 
              onCreateOption={label => {
                const newTag = {id : uuidV4() , label}
                onAddTag(newTag)
                setSelectedTags(prev => [...prev , newTag])
              }}
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
              isMulti/>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control required as="textarea" ref={markdownRef} rows={10} />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit">Save</Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NoteForm;