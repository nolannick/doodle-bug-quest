import React from "react";

class Header extends React.Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  render() {
    return (
        this.state.isLoggedIn ? (
            <header className="Bugs">
            <h1 className="header">Doodle Bug Quest</h1>
          </header>
        ) : (
            <header className="Bugs">
            <h1 className="header">Doodle Bug Quest</h1>
          </header>
        )
    );
  }
}

export default Header;
