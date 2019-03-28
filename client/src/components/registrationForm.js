import React from 'react';

const RegistrationForm = (props) => (
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
                <label className="inputLabel">Family Name: </label>
                <input className="inputField" name="familyName" placeholder="Enter Family Name" onChange={props.handleChange} />
            </div>
        </div>
        <br/>
        <p><button className="loginButton" onClick={props.register}>Register</button></p>
        <p>Already Registered? Click <a href="/#" onClick={props.toggleLogin}>here</a> to login instead.</p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

    </form>
);

export default RegistrationForm;