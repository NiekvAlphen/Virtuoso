import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import {useNavigate} from 'react-router-dom';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        
        this.login();
    }

    login() {
        const data = new FormData()
        data.append("id", 1)
        data.append("username", 'Ron')
        data.append('password', 'doei')
        data.append('email', 'ron@gmail.com')
        data.append('image', 'noimage.png')

        fetch('http://127.0.0.1:80/api/users/login', {method: 'POST', body: data,mode: 'cors'})
        .then(response => {
          console.log(response)
          if(response.status === 200){
            (response.json()).then((data) => {
                //this.setState({songs: data['songs']})
                console.log('loginData: '+data)
                console.log("successful login")
                var user = { 'id': data.id, 'username': data.username, 'password': data.password, 'email': data.email, 'image': data.image };
                localStorage.setItem('user', JSON.stringify(user));
                this.props.navigate('/create');
            })
          } else {
            console.log('login not successful')
          }
        }).catch((error) => {
            console.log("Error in fetching.", error)
        })
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="uname" required />

                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required />

                    </div>
                     <div className="button-container">
                        <button className="btn" onClick={this.handleSubmit}>Login</button>
                    </div>
                </form>
            </div>
        )
    }
    
}

function WithNavigation(props) {
    let navigate = useNavigate()
    return <Login {...props} navigate={navigate} />
}

export default WithNavigation