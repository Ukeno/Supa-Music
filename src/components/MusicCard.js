import supabase from '../config/supabaseClient'
import { Link } from 'react-router-dom'

const MusicCard = ({ music, album, onDelete }) => {
    const deleteComment = async () => {
        const { data, error } = await supabase
            .from('music')
            .delete()
            .eq('id', music.id)
            .select()

        if (error) {
            console.log(data)
        }
        if (data) {
            console.log(data)
            onDelete(music.id)
        }
    }
    return (
        <div className="music-card">
            {/* music.id */}
            <h3>{music.title}</h3>
            <p>{music.method}</p>
            <div className="rating">{music.rating}</div>
            {/* music.id */}
            <Link to={'/' + music.id}> 
                <i className='material-icons'>edit</i>
            </Link>
            <i className="material-icons" onClick={deleteComment}>delete</i>
        </div>
    )
}

export default MusicCard