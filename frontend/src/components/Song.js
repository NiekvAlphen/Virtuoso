import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import bgImg from '../assets/user-profile-default.png';
class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            song: this.props.song,
            onAdd: false,
            onRemove: false,
            isRemoval: false,
            songBg: null,
            setSongBg: null
        };
    }

    render() {
        const { id, song, onAdd, onRemove, isRemoval, songBg, setSongBg } = this.state;
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
            </ul>
        )
    }
    
}

const SongAction = ({isRemoval, removeSong, addSong}) => {
    return (
        <>
            {
                isRemoval ? <button className="btn" onClick={removeSong}> - </button> : <button className="btn" onClick={addSong}> + </button>
            }
        </>
    )
}
export default Song