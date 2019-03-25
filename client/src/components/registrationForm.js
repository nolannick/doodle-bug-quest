import React from 'react';

const Registration = (props) => (
    <form className="registrationForm">
        <div className="form-group">
            <div className="form-input">
                <label className="inputLabel">Username: </label>
                <input className="inputField" name="username" placeholder="Enter Email" onChange={props.handleChange} />
            </div>

            <div className="form-input">
                <label className="inputLabel">Password: </label>
                <input className="inputField" name="password" type="password" placeholder="Enter Password" onChange={props.handleChange} />
            </div>
            <div className="form-input">
                <label className="inputLabel">Confirm Password: </label>
                <input className="inputField" name="password2" type="password" placeholder="Confirm Password" onChange={props.handleChange} />
            </div>
            <div className="form-input">
                <label className="inputLabel">Family ID: </label>
                <input className="inputField" name="familyId" placeholder="Enter Family ID" onChange={props.handleChange} />
            </div>
        </div>
        <br/><br/><br/><br/><br/><br/><br/>
        <p><button className="loginButton" onClick={props.handleRegister}>Register</button></p>
        <p>Already Registered? Click <a href="/#" onClick={props.openLogin}>here</a> to login instead.</p>

    </form>
);

export default Registration;