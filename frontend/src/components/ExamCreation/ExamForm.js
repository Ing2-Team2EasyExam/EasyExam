import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import ExamProblemInputs from "./ExamProblemInputs";
import ExamDataInputs from "./ExamDataInputs";
import FormSubmitButton from "./FormButton";
class ExamForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    alert("Form Submitted");
  }
  render() {
    const style = {
      borderRadius: "5px",
      border: "2px solid black",
      padding: "2%",
      overflowY: "scroll",
      height: "70vh",
    };
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormSubmitButton />
          <div style={style}>
            <ExamDataInputs />
            <ExamProblemInputs />
          </div>
        </Form>
      </div>
    );
  }
}

export default ExamForm;
