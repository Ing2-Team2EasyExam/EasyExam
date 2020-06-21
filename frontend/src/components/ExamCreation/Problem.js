import React from "react";
import { ButtonGroup, Form, Col, Row } from "react-bootstrap";
import DeleteProblemButton from "./DeleteProblemButton";
import PreviewProblemButton from "./PreviewProblemButton";
import ProblemSelect from "./ProblemSelect";

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
    };
  }

  render() {
    return (
      <>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Problema {this.state.number} :
          </Form.Label>
          <Col sm={7}>
            <ProblemSelect />
          </Col>
          <Col sm={1}>
            <ButtonGroup>
              <PreviewProblemButton />
              <DeleteProblemButton />
            </ButtonGroup>
          </Col>
        </Form.Group>
      </>
    );
  }
}

export default Problem;
