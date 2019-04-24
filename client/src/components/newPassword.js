import React from "react";
import * as $ from "axios";

class Password extends React.Component {
  state = {
    password: "",
    password2: ""
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetPassword = (e) => {
      e.preventDefault();
      if (this.state.password && this.state.password === this.state.password2) {
        const newPassword = {
            password: this.state.password
        };
        $.post('/api/passwordreset/:guid', newPassword).then(res => {
            window.location.href = "/";
        })
      } else {
        console.log('didnt work');
      }
  };

  render () {
      return (
          <div>
              <p>Hello World</p>
          </div>
      )
  }
}

export default Password;
