import React from "react";
// const nodemailer = require("nodemailer");
// const uuidv4 = require('uuid/v4');

class ResetPassword extends React.Component {
  state = {
    username: ""
  };

  handeChange= e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

//   createReset = e => {
//       e.preventDefualt();
//       const guid = uuidv4();
//       const resetReq = {
//           guid: guid,
//           username: this.state.username
//       };

//   }

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
