import React, {useState, useEffect} from 'react';
import NavBar from './NavBar'
import {useNavigate} from 'react-router-dom';
import {deletePlaylist, getPlaylists} from "../utils/models";
import bgImg from '../assets/user-profile-default.png';
import Song from './Song';
const MyCollections = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));
    const [playlists, setPlaylists] = useState([])
    const [activePlaylist, setactivePlaylist] = useState()
    useEffect(() => {
        if(!localStorage.getItem("user")) {
            navigate("/");
        }
        getPlaylists(userData?.user_id).then(request => {
            return setPlaylists(request)
        }).catch((error) => console.log(error.message))
        if (!userData) {
            setUserData(JSON.parse(localStorage.getItem("user")));
        }
    }, [userData, navigate]);

    const togglePlaylist = (id) => {
        if (activePlaylist === id) {
            setactivePlaylist()
        }
        else {
            setactivePlaylist(id)
        }
    }
    const removePlaylist = (playlist) => {
        deletePlaylist(playlist.id).then(request => {
            const newPlaylist = playlists.filter((list) => list.id !== playlist.id)
            playlists.unshift(playlist)
            return setPlaylists(newPlaylist)
        }).catch((error) => console.log(error.message))
    }
    return (
        <>
            <NavBar userData={userData} />
            <div className="container">
                <h1>My Collections</h1>
                <article className="section">
                    <div className="songList">
                        <div className="playList">
                            {playlists.length ? playlists?.map((playlist) => { return (
                                <ul className="song" key={playlist.id}>
                                    <li onClick={() => togglePlaylist(playlist.id)}>
                                        <div>
                                            <div className="item">
                                                <div>
                                                    <h3>{playlist.name}</h3>
                                                </div>
                                                <button className="btn" onClick={(e) => {
                                                    e.preventDefault() 
                                                    removePlaylist(playlist)
                                                }}> Delete </button>
                                            </div>
                                        </div>
                                    </li>
                                    {activePlaylist === playlists.id && 
                                        <div>
                                            {playlist.songs.map((song) => { 
                                                return (
                                                    <Song key={song.id} song={song} />
                                                )})}
                                        </div>}
                                </ul>
                            )}) : <h2>No Playlist saved...</h2>}
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}
export default MyCollections