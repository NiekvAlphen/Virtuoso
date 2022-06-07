import React from 'react';
import Song from './Song';
import Img from "../assets/omo.png";
const SongList = ({ songs, onAdd, isRemoval, onRemove}) => {
    return (
        <>
            {(songs.length > 0) && 
                <div className="playList">
                    {songs.map((song) => {
                        return (
                            <Song key={song.id} song={song} onAdd={onAdd} isRemoval={isRemoval} onRemove={onRemove} />
                        )
                    })}
                </div>
            }
            {(songs.length === 0) && 
                <div className="playList">
                    <img src={Img} alt="Oops!" />
                        <h3>Oops! No tracks found.</h3>
                        <p>Search and a</p>
                </div>
            }
        </>
    );
};
export default SongList