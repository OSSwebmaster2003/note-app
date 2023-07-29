import {Form, Stack, Row, Col, Button} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {useRef ,useState} from "react"
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "../App";
import {v4 as uuidV4} from "uuid";

type NoteFormProps = {
  onSubmit : (data: NoteData) => void,
  onAddTag : (tag : Tag) => void,
  availableTags : Tag[]
}& Partial<NoteData>

function NoteForm({
  onSubmit, 
  onAddTag, 
  availableTags, 
  title = "", 
  markdown = "", 
  tags = []
} : NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags , setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()

  const handleSubmit = (e:any) => {
    e.preventDefault()

    onSubmit({
      title : titleRef.current!.value,
      markdown : markdownRef.current!.value,
      tags : selectedTags
    })

    navigate("..")
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label className="form__label">Title</Form.Label>
              <Form.Control 
                className="form__input" 
                ref={titleRef} 
                required 
                defaultValue={title} 
                placeholder="title..."
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label className="form__label">Tags</Form.Label>
              <CreatableReactSelect 
                className="form__select"
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
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label className="form__label">Body</Form.Label>
          <Form.Control className="form__input" required as="textarea" ref={markdownRef} rows={10} defaultValue={markdown} />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <button type="submit" className="primary__button">Save</button>
          <Link to="..">
            <button type="button" className="danger__button">Cancel</button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NoteForm;