import React from "react";
import LoginForm from "./loginForm";
import RegistrationForm from "./registrationForm";
import * as $ from "axios";
import Alert from './alert';
import ResetPassword from './resetPassword'

class Login extends React.Component {
  state = {
    acct_id: "",
    familyName: "",
    username: "",
    password: "",
    password2: "",
    toRegister: false,
    alert: "",
    loggedIn:false
  };

  isLoggedIn (){
    return this.state.loggedIn;
  }

  validateRegistration () {
    let valid = true;
    if (!this.state.familyName || !this.state.username) {
      valid = false;
    }
    return valid;
  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  loginClick = e => {
    e.preventDefault();
    const User = {
      username: this.state.username,
      password: this.state.password
    };
    this.login(User);
  };

  toggleLogin = event => {
    this.state.toRegister === false
      ? this.setState({ toRegister: true })
      : this.setState({ toRegister: false });
    this.setState({ alert: "" });
    localStorage.clear();
    sessionStorage.clear();
  };

  login = User => {
    localStorage.clear();
    $.post("/api/users/session", User).then(response => {
        if (response.data.token) {
          this.setState({
            acct_id: response.data.verifiedUser.acct_id,
            familyName: response.data.verifiedUser.famName,
            username: "",
            password: "",
            isLoggedIn: true
          });
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("acct_id", response.data.verifiedUser.acct_id);
          localStorage.setItem("familyName", response.data.verifiedUser.famName);
          window.location.href = "/family";
        } else {
          this.setState({ alert: "Login Failed" })
        };
        })
  };

  register = e => {
    e.preventDefault();
    this.setState({alert: ""});
    debugger;
    const isValid = this.validateRegistration();
    if (isValid) {
      const newUser = {
        username: this.state.username,
        password: this.state.password,
        familyname: this.state.familyName
      };
      if (this.state.password === this.state.password2) {
        $.post("/api/users/registration", newUser).then(response => {
          if (response.data.username) {
            this.login(newUser);
          } else if (response.data.error === 'User already exists') {
            this.setState({ alert: "Existing User" });
          } else {
            this.setState({ alert: "Registration Failed" });
          }
        });
      } else {
        this.setState({
          alert: "Password Mismatch"
        });
      }
    } else {
      this.setState({alert: 'Missing Info'})
    };    
  };

  render() {
    return (
      <div className="Bug">
        {this.state.alert && <Alert alert={this.state.alert} />}
        {this.state.toRegister ? (
          <RegistrationForm
            toggleLogin={this.toggleLogin}
            handleChange={this.changeHandler}
            register={this.register}
          />
        ) : (
          <div>
          <LoginForm
            changeHandler={this.changeHandler}
            username={this.state.username}
            password={this.state.password}
            login={this.loginClick}
            toggleLogin={this.toggleLogin}
          />
          <ResetPassword />
          </div>
        )}
      </div>
    );
  }
}

export default Login;
