import React from 'react';
import Song from './Song';
const SongList = ({ songs, onAdd, isRemoval, onRemove}) => {
    return (
        <>
            {(songs && songs.length > 0) ?
                <div className="playList">
                    {songs.map((song) => {
                        return (
                            <Song key={song.id} song={song} onAdd={onAdd} isRemoval={isRemoval} onRemove={onRemove} />
                        )
                    })}
                </div> : ''
            }
            {(songs.length === 0) && 
                <div className="playList">
                        <h3>Oops! No songs found.</h3>
                        <p>Search for a track using the search bar</p>
                </div>
            }
        </>
    );
};
export default SongList