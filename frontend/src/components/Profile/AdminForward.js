import React from "react";
import Button from "react-bootstrap/Button";
class AdminForward extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    this.setState({ loaded: this.props.isAdmin });
    console.log(this.state);
  }

  render() {
    const button = (
      <>
        <Button href="/admin" variant="primary" size="lg" block>
          <u>Administración</u>
        </Button>
      </>
    );
    const empty = <></>;

    if (this.props.isAdmin) {
      return <div>{button}</div>;
    } else {
      return <div>{empty}</div>;
    }
  }
}

export default AdminForward;
