import React from "react";
import { Card, Container, Row } from "react-bootstrap";

class CardForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{ padding: "16px" }}>
        <Row className="justify-content-md-center">
          <Card style={{ width: "70%" }}>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                {this.props.title}
              </Card.Title>
              {this.props.children}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

export default CardForm;
