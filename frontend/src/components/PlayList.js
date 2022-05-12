import React from 'react';
import SongList from "./SongList";
const PlayList = ({onNameChange, playListSongs, playListName, onRemove, onSave}) => {
    return (
        <>
            <div className="songList">
                <form className="form" onSubmit={onSave}>
                    <input id="playListName" type="text" onChange={(e) => onNameChange(e.target.value)} defaultValue={playListName} placeholder="PlayList Name" />
                    {(playListSongs.length > 0) && <button className="btn" onClick={onSave}>Save to Collections</button>}
                </form>
                <SongList songs={playListSongs} isRemoval={true} onRemove={onRemove} />
            </div>
        </>
    );
};
export default PlayList;