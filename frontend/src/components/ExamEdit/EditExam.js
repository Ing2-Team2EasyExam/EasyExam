import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class EditExam extends React.Component {
  /**
   * Parent component on which the interface for the exam creation is about.
   */
  render() {
    console.log(this.props);
    const { uuid } = this.props.match.params;
    console.log({ uuid });
    return (
      <>
        <h1>Edit Exam </h1>
        <Container>
          <Row>
            <Col>
              <h5>Edit Exam</h5>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default EditExam;
