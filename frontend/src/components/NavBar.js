import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import userImg from '../assets/user-profile-default.png';

const NavBar = ({ userData }) => {
    const [userProfile, setUserProfile] = useState(false)
    return (
        <>
            <div>
                <div className="dropDown" onMouseEnter={() => setUserProfile(!userProfile)} onMouseLeave={() => setUserProfile(false)}>
                    <img src={userData?.image || userImg} alt="user" />
                    {userProfile && <ul>
                        <li><h3>{ userData?.name || 'John Doe' }</h3></li>
                        <li>
                            <p>
                                <a href={userData?.url || '/'} target="_blank" rel='noopener noreferrer'>{'Profile >>'}</a>
                            </p>
                        </li>    
                    </ul>}
                </div>
                <div>
                    <Link to='/' className="btn">Home</Link>
                    <Link to='/mycollections' className="btn">Collections</Link>
                    <Link to='/' className='btn' onClick={() => localStorage.clear()}>Logout</Link>
                </div>
            </div>
        </>
    )
}
export default NavBar