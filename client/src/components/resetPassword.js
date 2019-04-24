import React from "react";
import * as $ from "axios";
import * as emailjs from "emailjs-com";
import Alert from "./alert";
import {Link} from 'react-router-dom';
const uuidv4 = require("uuid/v4");

class ResetPassword extends React.Component {
  state = {
    username: "",
    alert: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  createReset = e => {
    e.preventDefault();
    if (this.state.username) {
      const guid = uuidv4();
      const resetReq = {
        guid: guid,
        username: this.state.username
      };
      $.post("/api/resetPasswordAttempt", resetReq).then(response => {
          this.setState({username: ''});
        const mailOptions = {
          toName: response.data.username,
          guid: guid
        };
        emailjs
          .send(
            "gmail",
            "template_QTpMwusY",
            mailOptions,
            "user_PvABvsjAlINaXR5B8G5A4"
          )
          .then(status => {
              console.log("Success", status.status, status.text);
              this.setState({  
                  alert: "Email Sent" });
            },
            function(error) {
              console.log("Error:", error);
            }
          );
      });
    } else {
      this.setState({ alert: "Missing Info" });
    }
  };

  render() {
    return (
      <div className="bug flexCenter">
        {this.state.alert && <Alert alert={this.state.alert} />}
        <form className="registrationForm">
          <div className="form-group">
            <div className="form-input">
              <label className="inputLabel">Email Address: </label>
              <input
                className="inputField"
                name="username"
                placeholder="Enter Email"
                value = {this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <br />
            <div>
              <p>
                <button className="loginButton" onClick={this.createReset}>
                  Request Password Reset
                </button>
              </p>
            </div>
            <p>
              <Link to="/">Return to Login</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
