import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuestionForm from "./QuestionForm";
import RenderPDF from "./RenderPDF"
class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(event) {
    event.preventDefault();
    alert("Form Submitted");
  }
    render() {
      return (
        <>
          <h1>Preguntas </h1>
          <Container>
            <Row>
              <Col>
                <QuestionForm />
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
  
  export default Questions;