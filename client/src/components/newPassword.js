import React from "react";
import * as $ from "axios";
import { Link } from "react-router-dom";
import Alert from "./alert";

class Password extends React.Component {
  state = {
    password: "",
    password2: "",
    alert: "",
    guid: ""
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("id");
    this.setState({ guid: myParam });
  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetPassword = e => {
    e.preventDefault();
    if (!this.state.password || !this.state.password2) {
      this.setState({ alert: "Missing Info" });
    } else if (this.state.password === this.state.password2) {
      const newPassword = {
        password: this.state.password
      };
      $.post(`/api/passwordreset/${this.state.guid}`, newPassword).then(res => {
        this.setState({ 
            alert: "Password Reset", 
            password: "", 
            password2: "" });
      });
    } else {
      this.setState({ alert: "Password Mismatch" });
    }
  };

  render() {
    return (
      <div className="bug">
        {this.state.alert && <Alert alert={this.state.alert} />}
        <form className="loginForm">
          <div className="form-group flexCenter">
            <div className="form-input">
              <label className="inputLabel">Password: </label>
              <input
                className="inputField"
                name="password"
                type="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-input">
              <label className="inputLabel" />
              <input
                className="inputField"
                name="password2"
                type="password"
                value={this.state.password2}
                placeholder="Confirm Password"
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <div className="flexCenter">
            <button
              className="loginButton"
              type="submit"
              onClick={this.resetPassword}
            >
              Reset Password
            </button>
          </div>
          <div className="flexCenter">
            <p>
              <Link to="/">Return to Login</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Password;
