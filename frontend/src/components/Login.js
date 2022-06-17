import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import {useNavigate} from 'react-router-dom';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            alreadyExists: false
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value})
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        
        this.login();
    }

    login() {
        const data = new FormData()
        data.append("username", this.state.username)
        data.append('password', this.state.password)

        fetch('http://127.0.0.1:80/api/users/login', {method: 'POST', body: data,mode: 'cors'})
        .then(response => {
          console.log(response)
          if(response.status === 200){
            (response.json()).then((data) => {
                //this.setState({songs: data['songs']})
                console.log('loginData: '+data)
                console.log("successful login")
                var user = { 'id': data.id, 'username': data.username, 'password': '', 'email': data.email, 'image': data.image };
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
                        <input type="text" name="uname" required value={this.state.username} onChange={this.handleUsernameChange}/>

                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required value={this.state.password} onChange={this.handlePasswordChange}/>

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