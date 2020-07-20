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
  }

  render() {
    const button = (
      <Button href="/admin" variant="primary" size="lg" block>
        Administración
      </Button>
    );
    const empty = <></>;

    if (this.props.isAdmin) {
      return (
        <Button
          href="/admin"
          variant="primary"
          size="lg"
          block
          style={{ marginTop: "5px" }}
        >
          Administración
        </Button>
      );
    } else {
      return <div>{empty}</div>;
    }
  }
}

export default AdminForward;
