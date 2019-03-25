import React from 'react';
import LoginForm from './loginForm';

class Login extends React.Component {

    state = {
        acct_id: "",
        familyName: '',
        username: '',
        password: ''
    }

    changeHandler = (e) => {
		const {name, value} = e.target;
		this.setState({ [name]: value });
    }

    login = (e) => {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password
        };
        localStorage.clear();
        $.post('/api/users/session', newUser)
        .then(response => {
            this.setState({
              acct_id: response.verifiedUser.acct_id,
              familyName: response.verifiedUser.famName,
              username: '',
              password: '' 
            });
            localStorage.setItem('token', response.token);
            localStorage.setItem('acct_id', response.verifiedUser.acct_id);
            localStorage.setItem('familyName', response.verifiedUser.famName);
            window.location.href = '/family';
        })
    }



    render () {
        return (
            <LoginForm changeHandler={this.changeHandler} 
            username={this.state.username}
            password={this.state.password} 
            onClick={this.login}/>
        )
    }
}

export default Login