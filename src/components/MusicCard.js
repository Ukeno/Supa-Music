import {Link} from 'react-router-dom'

const MusicCard = ({ music }) => {
    return (
        <div className="music-card">
            <h3>{music.title}</h3>
            <p>{music.method}</p>
            <div className="rating">{music.rating}</div>
            <Link to={'/' + music.id}>
                <i className='material-icons'>edit</i>
            </Link>
        </div>
    )
}

export default MusicCard