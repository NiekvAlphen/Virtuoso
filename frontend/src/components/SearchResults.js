import React, {useState} from 'react';
import SongList from './SongList';
const SearchResults = ({ search, searchResults, onAdd}) => {
    return (
        <>
            <div className="songList">
                <SearchBar onSearch={search} />
                    <SongList songs={searchResults} onAdd={onAdd} />
            </div>
        </>
    )
}
const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(term);
    };
    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <input id="searchBar" type="text" placeholder="Song or artist name" onChange={(e) => setTerm(e.target.value)} />
                <button className="btn" onClick={handleSubmit}>SEARCH</button>
            </form>
        </>
    )
}
export default SearchResults