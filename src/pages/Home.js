import supabase from "../config/supabaseClient"
import { useEffect, useState } from 'react'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [music, setMusic] = useState(null)

  useEffect(() => {
    const fetchMusic = async () => {
      const { data, error } = await supabase
        .from('music')
        .select()
      if (error) {
        setFetchError('Could not fetch the music')
        setMusic(null)
      }
      if (data) {
        setMusic(data)
        setFetchError(null)
        console.log(data) // logs data in browsers inspect
      }
    }

    fetchMusic()

  }, [])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {music && (
        <div className="music">
          {music.map(music => (
            <p>{music.title}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home