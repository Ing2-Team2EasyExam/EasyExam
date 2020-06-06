import React from "react";
import LoggedInNavbar from "./LoggedInNavbar";
import LoggedOutNavbar from "./LoggedOutNavbar";


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.isLoggedIn,
    };
  }

  render() {
    if (this.state.isLoggedIn) {
      return <LoggedInNavbar />;
    } else {
      return <LoggedOutNavbar />;
    }
  }
}

export default Navbar;
