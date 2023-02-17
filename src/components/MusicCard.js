const MusicCard = ({ music }) => {
    return (
        <div className="music-card">
            <h3>{music.title}</h3>
            <p>{music.method}</p>
            <div className="rating">{music.rating}</div>
        </div>
    )
}

export default MusicCard