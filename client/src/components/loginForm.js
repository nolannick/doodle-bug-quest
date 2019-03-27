import React from 'react';

const LoginForm = (props) => (
    <form className="loginForm">
        <div className="form-group">
            <div className="form-input">
                <label className="inputLabel">Username: </label>
                <input className="inputField" name="username" placeholder="Enter username" onChange={props.changeHandler}></input>
            </div>
            <div className="form-input">
                <label className="inputLabel">Password: </label>
                <input className="inputField" name="password" type="password" placeholder="Enter Password" onChange={props.changeHandler}></input>
            </div>
        </div>
        <div className="flexCenter">
        <button className="loginButton" type="submit" onClick={props.login}>Login</button>
        </div><div className="flexCenter">
        <p>Not yet Registered? Click <a href="/#" onClick={props.toggleLogin}>here</a> to register instead.</p><br/><br/><br/>
        </div>
    </form>
)

export default LoginForm;