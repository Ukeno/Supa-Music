import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../config/supabaseClient'

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

    const {data, error} = await supabase
      .from('music') //Needs to be filled out cause im not sure on name
      .insert([{ title, method, rating }])

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
    <div className="page create">
      <form onSubmit={createComment}>
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

        <button>Comment</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default Create