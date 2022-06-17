import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import userImg from '../assets/user-profile-default.png';
import {deleteUser} from "../utils/models";

const UserProfile = () => {
    const [userData, setUserData] = useState()
    useEffect(() => {
        if (!localStorage.getItem('user')) {
       
        }
        setUserData(JSON.parse(localStorage.getItem('user')))
    }, [])
    return (
        <>
            <div className="profile-page">
                <div className="links">
                    <Link to='/create' className="btn">Home</Link>
                    <Link to='/my-playlists' className="btn">Playlists</Link>
                    <Link to='/upload' className="btn">Upload</Link>
                    <Link to='/' className='btn' onClick={() => localStorage.clear()}>Logout</Link>
                </div>
                <img src={userData?.image !== "null" || userImg} alt="user" />
                <ul>
                    <li><h3>{ userData?.username || 'John Doe' }</h3></li>    
                </ul>
                <div className="delete-container">
                    <div className="btn-delete" onClick={deleteUser(userData?.id)}>Delete account</div>
                </div>
            </div>
        </>
    )
}
export default UserProfile