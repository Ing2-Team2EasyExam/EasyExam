import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import ExamProblemInputs from "./ExamProblemInputs";
import ExamDataInputs from "./ExamDataInputs";
import FormSubmitButton from "./FormButton";
class ExamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dueDate: "",
      startTime: "",
      endTime: "",
      teacher: "",
      courseName: "",
      courseCode: "",
      university: "",
      language: "EN",
      problems: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLanguageSelection = this.handleLanguageSelection.bind(this);
    this.handleProblemSelection = this.handleProblemSelection.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleLanguageSelection(event) {
    const target = event.target;
    const value = target.value == "Ingles" ? "EN" : "ES";
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleProblemSelection(name, author) {
    this.setState({
      problems: {
        name: name,
        author: author,
      },
    });
  }
  handleSubmit(event) {
    event.preventDefault();
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
            <ExamDataInputs
              handleInputChange={this.handleInputChange}
              handleSelect={this.handleLanguageSelection}
            />
            <ExamProblemInputs handleSelect={this.handleProblemSelection} />
          </div>
        </Form>
      </div>
    );
  }
}

export default ExamForm;
