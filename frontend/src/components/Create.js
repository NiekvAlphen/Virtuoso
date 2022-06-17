import React, {useState, useEffect} from 'react';
import PlayList from './PlayList';
import SearchResults from './SearchResults.js';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { searchSong, savePlaylist, getUser } from '../utils/models';
const Create = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(getUser())
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/')       
        }
        setUserData(JSON.parse(localStorage.getItem('user')))
    }, [navigate])
    const [searchResults, setSearchResults] = useState([])
    const [playListName, setPlayListName] = useState("")
    const [playListSongs, setPlayListSongs] = useState([])
    const search = async (term) => {
        try {
            if (term !== "") { 
                const searchResults = await searchSong(term)
                setSearchResults(searchResults)
            }
            else {
                document.querySelector("#searchBar").focus()
            }
        }
        catch(error) {

        }
    }
    const addSong = (song) => {
        if(playListSongs.find((savedSong) => savedSong.id === song.id)) {
            return
        }
        const newPlaylistSongs = [...playListSongs, song]
        setPlayListSongs(newPlaylistSongs)
    }
    const removeSong = (song) => {
        const newPlaylistSongs = playListSongs.filter((currentSong) => currentSong.id !== song.id)
        searchResults.unshift(song)
        setPlayListSongs(newPlaylistSongs)
    }
    const removeSongSearch = (song) => {
        const newSearchResults = searchResults.filter((currentSong) => currentSong.id !== song.id)
        setSearchResults(newSearchResults)
    }
    const doThese = (song) => {
        addSong(song)
        removeSongSearch(song)
    }
    const updatePlayListname = (name) => {
        setPlayListName(name)
    }
    const saveNewPlaylist = (e) => {
        e.preventDefault()
        if(playListName !== "") {
            alert ("Playlist added successfully...")
            const data = new FormData()
            data.append("title", playListName)
            data.append('creator', 1)
            //userData.id
            const songs_array = []
            for(let i = 0; i < playListSongs.length; i++) {
                songs_array[i] = playListSongs[i].id
            }
            data.append('songs_array', songs_array)

            savePlaylist(data).then(req => {
                if (req) {
                    setPlayListName("")
                    setPlayListSongs([])
                }
            })
        } else {
            document.querySelector('#playListName').focus()
        }
    }

    return (
        <>
            <NavBar userData={userData}/>
            <div className="container">
                <h1>Virtuoso</h1>
                <article className="section">
                    <SearchResults search={search} searchResults={searchResults} onAdd={doThese}/>
                    <PlayList playListSongs={playListSongs} playListName={playListName} onNameChange={updatePlayListname} onRemove={removeSong} onSave={saveNewPlaylist} />
                </article>
            </div>
        </>
    )
}
export default Create