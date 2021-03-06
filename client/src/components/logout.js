import React from "react";

class Logout extends React.Component {

  logout(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  }

  render() {
    return (
        <button className='logoutButton btn addCreateBtn' onClick={this.logout}>Logout</button>
    );
  }
}

export default Logout;
