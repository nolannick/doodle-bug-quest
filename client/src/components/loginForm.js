import React from 'react';
import {Link} from 'react-router-dom';

const LoginForm = (props) => (
    <form className="loginForm">
        <div className="form-group">
            <div className="form-input">
                <label className="inputLabel">Username:</label>
                <input className="inputField" name="username" placeholder="Enter username" onChange={props.changeHandler}></input>
            </div>
            <br/>
            <br/>
            <div className="form-input">
                <label className="inputLabel">Password:</label>
                <input className="inputField" name="password" type="password" placeholder="Enter Password" onChange={props.changeHandler}></input>
            </div>
        </div>
        <div className="flexCenter">
        <button className="loginButton" type="submit" onClick={props.login}>Login</button>
        </div><div className="flexCenter">
        <p><a href="/#" onClick={props.toggleLogin}>Register</a> || <Link to="/resetpassword">Forgot Password</Link></p>
        </div>
    </form>
)

export default LoginForm;