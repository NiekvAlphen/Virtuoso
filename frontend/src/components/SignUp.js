import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import {useNavigate} from 'react-router-dom';
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            alreadyExists: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.goToLogin = this.goToLogin.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()

        if(!this.checkUserAlreadyExists()){
            this.signUp();
        }
    }
    handleUsernameChange(event) {
        this.setState({username: event.target.value})
    }
    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }
    checkUserAlreadyExists() {
        //this.setState({alreadyExists: true})
        return false;
    }
    goToLogin() {
        this.props.navigate('/login')
    }

    signUp() {
        const data = new FormData()
        data.append("id", 1)
        data.append("username", this.state.username)
        data.append('password', this.state.password)
        data.append('email', this.state.email)
        data.append('image', 'noimage.png')

        fetch('http://127.0.0.1:80/api/users', {method: 'POST', body: data,mode: 'cors'})
        .then(response => {
          console.log(response)
          if(response.status === 201){
            (response.json()).then((data) => {
              //this.setState({songs: data['songs']})
              console.log(data)
              var user = { 'id': data.id, 'username': data.username, 'password': data.password, 'email': data.email, 'image': data.image };
              localStorage.setItem('user', JSON.stringify(user));
              this.props.navigate('/create');
            })
          } else {
            (response.json()).then(() => {
              //this.setState({songs: 'error'})
            })
          }
        }).catch((error) => {
            console.log("Error in fetching.", error)
        })
    }

    render() {
        const doesAlreadyExist = this.state.alreadyExists;
        let buttonToLogin;
        if (doesAlreadyExist) {
            buttonToLogin = <button className="btn" onClick={this.goToLogin}>Go to Login</button>
        }
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="uname" required placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />

                    </div>
                    <div className="input-container">
                        <label>Email </label>
                        <input type="email" name="email" required placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />

                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>

                    </div>
                    <div className="button-container">
                        <button className="btn"onClick={this.handleSubmit}>SignUp</button>
                    </div>
                    <div>{buttonToLogin}</div>
                </form>
            </div>
        )
    }
    
}

function WithNavigation(props) {
    let navigate = useNavigate()
    return <SignUp {...props} navigate={navigate} />
}

export default WithNavigation