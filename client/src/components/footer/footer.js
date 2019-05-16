import React, {Component} from 'react';
import Logout from "../logout";
// import './footer.css';


class FooterComponent extends Component {

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
      <div className="footer">
        <Logout />
        <br/>
        <div className="copyright">
          Copyright &#169;2019 Doodle Bug Quest
        </div>
      </div>
    ):(
      <div className="footer">
        <div className="copyright">
          Copyright &#169;2019 Doodle Bug Quest
        </div>
      </div>
    )
    );
  }
}

export default FooterComponent;
