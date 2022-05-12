import React from 'react';
import Song from './Song';
class SongList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onAdd: false,
            isRemoval: false,
            onRemove: false,
            songs: this.props.songs
        };
    }

    render() {
        const { onAdd, isRemoval, onRemove, songs } = this.state;
        return (
            <>
                {(songs.length > 0) && <div className="playList">{songs.map((song) => {return (<Song id={song.id} song={song} onAdd={onAdd} isRemoval={isRemoval} onRemove={onRemove} />)})}</div>}
                {(songs.length === 0) && <div className="playList"><h3>Oops! No songs found</h3><p>Search and add a song</p></div>}
            </>
        )
    }
}
export default SongList