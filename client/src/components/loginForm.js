import React from 'react';

const Login = (props) => (
    <form className="loginForm">
        <div className="form-group">
            <div className="form-input">
                <label className="inputLabel">Username: </label>
                <input className="inputField" name="username" placeholder="Enter username" onChange={props.handleChange}></input>
            </div>
            <div className="form-input">
                <label className="inputLabel">Password: </label>
                <input className="inputField" name="password" type="password" placeholder="Enter Password" onChange={props.handleChange}></input>
            </div>
        </div>
        <br/><br/><br/><br/>
        <button className="loginButton" type="submit" onClick={props.handleLogin}>Login</button>
        <p>Not yet Registered? Click <a href="/#" onClick={props.openRegister}>here</a> to register instead.</p>
    </form>
)

export default Login;