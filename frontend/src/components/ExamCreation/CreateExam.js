import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ExamForm from "./ExamForm";
import RenderPDF from "./RenderPDF";
class CreateExam extends React.Component {
  /**
   * Parent component on which the interface for the exam creation is about.
   */
  render() {
    return (
      <>
        <h1>Create Exam</h1>
        <Container>
          <Row>
            <Col>
              <ExamForm />
            </Col>
            <Col>
              <RenderPDF />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default CreateExam;
