import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class EEContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container style={{ padding: "16px" }}>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <h4 style={{ textAlign: "center" }}>{this.props.title}</h4>
            {this.props.children}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default EEContainer;
