import React from "react";
import LoggedInNavbar from "./LoggedInNavbar";
import LoggedOutNavbar from "./LoggedOutNavbar";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isLoggedIn) {
      return <LoggedInNavbar doLogout={this.props.doLogout} />;
    } else {
      return <LoggedOutNavbar />;
    }
  }
}

export default Navbar;
