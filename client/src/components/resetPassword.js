import React from "react";
import * as $ from "axios";
import * as emailjs from 'emailjs-com';
const uuidv4 = require('uuid/v4');

class ResetPassword extends React.Component {
  state = {
    username: ""
  };



  handleChange= e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  createReset = e => {
      e.preventDefault();
      const guid = uuidv4();
      const resetReq = {
          guid: guid,
          username: this.state.username
      };
      console.log('input:', resetReq.username)
      $.post('/api/resetPasswordAttempt', resetReq).then(response => {
          console.log(response);
        const mailOptions = {
            toName: response.data.username,
            guid: guid
          };
          emailjs.send("gmail", "template_QTpMwusY", mailOptions, 'user_PvABvsjAlINaXR5B8G5A4').then(
            function(status) {
              console.log("Success", status.status, status.text);
            },
            function(error) {
              console.log("Error:", error);
            }
          );
      })

  }

  render() {
      return(
          <div className = 'bug'>
                      <form className="registrationForm">
        <div className="form-group">
          <div className="form-input">
            <label className="inputLabel">Email Address: </label>
            <input
              className="inputField"
              name="username"
              placeholder="Enter Email"
              onChange={this.handleChange}
            />
          </div>
          <div className="flexCenter">
            <p>
              <button className="loginButton" onClick={this.createReset}>
                Request Password Reset
              </button>
            </p>
          </div>
        </div>
      </form>
          </div>
      )
  }
}

export default ResetPassword;
