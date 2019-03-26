import React from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./registrationForm";
import * as $ from "axios";

const Alert = props => {
  return props.alert === "Invalid Password" ? (
    <div className="alert alert-danger">
      Password is incorrect. Please try again.
    </div>
  ) : props.alert === "Password Mismatch" ? (
    <div className="alert alert-danger">
      Passwords do not match. Please correct and try again.
    </div>
  ) : (
    <div />
  );
};

class Login extends React.Component {
  state = {
    acct_id: "",
    familyName: "",
    username: "",
    password: "",
    password2: "",
    toRegister: false,
    alert: ""
  };

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
        console.log(response);
      this.setState({
        acct_id: response.data.verifiedUser.acct_id,
        familyName: response.data.verifiedUser.famName,
        username: "",
        password: ""
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("acct_id", response.data.verifiedUser.acct_id);
      localStorage.setItem("familyName", response.data.verifiedUser.famName);
      window.location.href = "/family";
    });
  };

  register = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      familyname: this.state.familyName
    };
    if (this.state.password === this.state.password2) {
      $.post("/api/users/registration", newUser).then(response => {
        this.login(newUser);
      });
    } else {
      this.setState({
        alert: "Password Mismatch"
      });
    }
  };

  render() {
    return (
      <div>
        <Alert alert={this.state.alert} />
        {this.state.toRegister ? (
          <RegistrationForm
            toggleLogin={this.toggleLogin}
            handleChange={this.changeHandler}
            register={this.register}
          />
        ) : (
          <LoginForm
            changeHandler={this.changeHandler}
            username={this.state.username}
            password={this.state.password}
            login={this.loginClick}
            toggleLogin={this.toggleLogin}
          />
        )}
      </div>
    );
  }
}

export default Login;
