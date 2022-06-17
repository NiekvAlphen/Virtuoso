import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import userImg from '../assets/user-profile-default.png';

const NavBar = ({ userData }) => {
    const [userProfile, setUserProfile] = useState(false)
    return (
        <>
            <div>
                <div className="dropDown" onMouseEnter={() => setUserProfile(!userProfile)} onMouseLeave={() => setUserProfile(false)}>
                    <img src={userData?.image !== "null" || userImg} alt="user" />
                    {userProfile && <ul>
                        <li><h3>{ userData?.username || 'John Doe' }</h3></li>
                        <li>
                            <p>
                                <Link to='/user-profile' className="btn">Profile</Link>
                            </p>
                        </li>    
                    </ul>}
                </div>
                <div>
                    <Link to='/create' className="btn">Home</Link>
                    <Link to='/my-playlists' className="btn">Playlists</Link>
                    <Link to='/upload' className="btn">Upload</Link>
                    <Link to='/' className='btn' onClick={() => localStorage.clear()}>Logout</Link>
                </div>
            </div>
        </>
    )
}
export default NavBar