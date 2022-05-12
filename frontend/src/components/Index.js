import React from 'react';
import {useNavigate} from 'react-router-dom';
import {createUser, getUser} from '../utils/models';

const Index = () => {
    const navigate = useNavigate()

    if (localStorage.getItem('user')) {
        navigate('/create')
    }

    const Signup = () => {
        console.log("signup")

        navigate('/signup')
    }

    const Login = () => {
        console.log("login")

        navigate('/login')
    }

    return (
        <>
            <div className="container">
                <br /><br /><br />
                <h1>Virtuoso</h1>
                <br /><br /><br />
                <span className="btn" onClick={() => Login()}>Login</span>
                <br /><br />
                <p>OR</p>
                <span className="btn" onClick={() => Signup()}>Signup</span>
            </div>
        </>
    )
}

export default Index