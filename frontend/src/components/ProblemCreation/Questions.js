import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuestionForm from "./QuestionForm";
import RenderPDF from "./RenderPDF";
import EEContainer from "../EEComponents/EEContainer";
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
      <EEContainer title="Crear Pregunta">
        <QuestionForm />
      </EEContainer>
    );
  }
}

export default Questions;
