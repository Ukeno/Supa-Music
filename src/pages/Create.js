import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../config/supabaseClient'
import Form from 'react-bootstrap/Form'
import './Create.css'

const Create = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const createComment = async (e) => {
    e.preventDefault()
    if (!title || !method || !rating) {
      setFormError('Please fill in all fields')
      return
    }

    const { data, error } = await supabase
      .from('music')
      .insert([{ title, method, rating }])
      .select()

    if (error) {
      setFormError('Please fill in all fields')
    }
    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }
  }

  return (
    <div className='Img'>
      <div className="page-create" >
        <Form onSubmit={createComment}>
          <Form.Group id="Title" className="mb-3">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

          </Form.Group>
          <Form.Group className='mb-3'>
            <label htmlFor="method">Comment</label>
            <textarea
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Form.Group>

          <button>Comment</button>
          {formError && <p className='error'>{formError}</p>}
        </Form>
      </div>
    </div>
  )
}

export default Create