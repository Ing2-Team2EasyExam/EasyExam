import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

class AddTopicButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Form.Group as={Row}>
          <Col>
            <Button variant="primary" onClick={this.props.addTopic}>
              <Plus /> Añadir otro tópico
            </Button>
          </Col>
        </Form.Group>
      </>
    );
  }
}

export default AddTopicButton;
