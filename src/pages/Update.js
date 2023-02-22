import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"
import './Create.css'

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !method || !rating) {
      setFormError('Please fill in all fields')
      return
    }
    const { data, error } = await supabase
      .from('music')
      .update([{ title, method, rating }])
      .eq('id', id)
      .select()

    if (error) {
      setFormError('Please fill in all fields')
    }
    if (data) {
      setFormError(null)
      navigate('/')
    }
  }

  useEffect(() => {
    const fetchComment = async () => {
      const { data, error } = await supabase
        .from('music')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
      }
    }

    fetchComment()
  }, [id, navigate])

  return (
    <div className='Img'>
      <div className="page-update">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Name</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="method">Comment</label>
          <textarea
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />

          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="title"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <br />
          <button>Update Comment</button>
          {formError && <p className='error'>{formError}</p>}
        </form>
      </div>
    </div>
  )
}

export default Update