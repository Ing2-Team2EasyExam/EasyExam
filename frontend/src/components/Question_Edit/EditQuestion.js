import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import RenderPDF from "./RenderPDF";
import QuestionEditForm from "./QuestionEditForm";
class EditQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Form Submitted");
  }
  render() {
    const { uuid } = this.props.match.params;
    return (
      <>
        <h1>Editar Pregunta </h1>
        <Container>
          <Row>
            <Col>
              <QuestionEditForm uuid={uuid} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default EditQuestion;
