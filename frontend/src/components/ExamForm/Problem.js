import React from "react";
import { ButtonGroup, Form, Col, Row } from "react-bootstrap";
import DeleteProblemButton from "./DeleteProblemButton";
import PreviewProblemButton from "./PreviewProblemButton";
import ProblemSelect from "./ProblemSelect";

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      problems: [],
    };
    this.removeProblem = this.removeProblem.bind(this);
  }
  removeProblem(event) {
    let index = this.props.number;
    this.props.removeProblem(index);
  }
  render() {
    return (
      <>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Problema {this.props.number + 1} :
          </Form.Label>
          <Col sm={5}>
            <ProblemSelect
              handleChange={this.handleChange}
              value={`${this.props.author} -!-! ${this.props.name}`}
              number={this.props.number}
              updateProblem={this.props.updateProblem}
            />
          </Col>
          <Col sm={3}>
            <Form.Group as={Row} controlId={this.props.controlId}>
              <Form.Label column sm={6}>
                Puntos :
              </Form.Label>
              <Col sm={6}>
                <Form.Control name="point" type="number" placeholder="0" />
              </Col>
            </Form.Group>
          </Col>
          <Col sm={1}>
            <ButtonGroup>
              <PreviewProblemButton />
              <DeleteProblemButton onClick={this.removeProblem} />
            </ButtonGroup>
          </Col>
        </Form.Group>
      </>
    );
  }
}

export default Problem;
