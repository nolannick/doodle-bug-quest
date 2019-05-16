import React, {Component} from 'react';
import Logout from "../logout";
// import './footer.css';


class FooterComponent extends Component {

  render() {
    return (
      <div className="footer">
        <Logout />
        <br/>
        <div className="copyright">
          Copyright &#169;2019 Doodle Bug Quest
        </div>
      </div>
    );
  }
}

export default FooterComponent;
