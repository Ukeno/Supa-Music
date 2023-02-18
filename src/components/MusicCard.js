import supabase from '../config/supabaseClient'
import {Link} from 'react-router-dom'


const MusicCard = ({ music, onDelete }) => {
    const deleteComment = async () => {
        const { data, error } = await supabase
            .from('music')
            .delete()
            .eq('id', music.id)

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
            <h3>{music.title}</h3>
            <p>{music.method}</p>
            <div className="rating">{music.rating}</div>
            <Link to={'/' + music.id}>
                <i className='material-icons'>edit</i>
            </Link>
            <i className="material-icons" onClick={deleteComment}>delete</i>
        </div>
    )
}

export default MusicCard