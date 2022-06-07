import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import bgImg from '../assets/user-profile-default.png';
const Song = ({ song, onAdd, onRemove, isRemoval }) => {
    const [songBg, setSongBg] = useState('')
    useEffect(() => {
        song.image? setSongBg(song.image) : setSongBg(bgImg)
    }, [song.image])
    const addSong = () => onAdd(song)
    const removeSong = () => onRemove(song)
    return (
        <ul className="song">
            <li>
                <div>
                    <div className="item">
                        <div>
                            <h3>{song.title}</h3>
                            {song.artist} | {song.genre}
                        </div>
                        {
                            onAdd || onRemove ? <SongAction isRemoval={isRemoval} removeSong={removeSong} addSong={addSong} /> : ""
                        }
                    </div>
                </div>
            </li>
            <li>Spotify Card</li>
        </ul>
    )
}
const SongAction = ({ isRemoval, removeSong, addSong }) => {
    return (
        <>
            {
                isRemoval ? <button className="btn" onClick={removeSong}> - </button> : <button className="btn" onClick={addSong}> + </button>
            }
        </>
    )
}

export default Song