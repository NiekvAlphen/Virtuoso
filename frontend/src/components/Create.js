import React, {useState, useEffect} from 'react';
import PlayList from './PlayList';
import SearchResults from './SearchResults.js';
import NavBar from './NavBar';
import {useNavigate} from 'react-router-dom';
import {savePlaylist} from '../utils/models';
const Create = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")))
    useEffect(() => {
        if (!localStorage.getItem("user")) {
            //navigate('/')
        }
        setUserData(JSON.parse(localStorage.getItem("user")))
    }, [navigate])
    const [searchResults, setSearchResults] = useState([])
    const [playListName, setPlayListName] = useState("")
    const [playListSongs, setPlayListSongs] = useState([])
    const search = (term) => {

    }
    const addSong = (somg) => {

    }
    const removeSong = (song) => {

    }
    const removeSongSearch = (song) => {

    }
    const updatePlayListname = (name) => {

    }
    const savePlaylist = (playlist) => {

    }

    return (
        <>
            <NavBar userData={userData}/>
            <div className="container">
                <h1>Virtuoso</h1>
                <article className="section">
                    <SearchResults search={search} searchResults={searchResults}/>
                    <PlayList playListSongs={playListSongs} playListName={playListName} onNameChange={updatePlayListname} onRemove={removeSong} onSave={savePlaylist} />
                </article>
                <audio controls="controls" src="https://virtuoso1.blob.core.windows.net/c20c2dbc-d6ba-4b79-8ea7-0359f8487a2d/Short Song (English Song) [W Lyrics] 30 seconds.mp3" type="audio/mp3" />
            </div>
        </>
    )
}
export default Create