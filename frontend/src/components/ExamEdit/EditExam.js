import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EditExamForm from "./EditExamForm";

class EditExam extends React.Component {
  /**
   * Parent component on which the interface for the exam creation is about.
   */
  render() {
    const { uuid } = this.props.match.params;
    return (
      <>
        <h1>Edit Exam </h1>
        <Container>
          <Row>
            <Col>
              <EditExamForm uuid={uuid} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default EditExam;
