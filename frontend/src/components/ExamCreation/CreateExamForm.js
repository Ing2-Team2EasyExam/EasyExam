import React from "react";
import { Form } from "react-bootstrap";
import ExamDataInputs from "./ExamDataInputs";
import ExamProblems from "./ExamProblems";
import FormSubmitButton from "./FormSubmitButton";

class CreateExamForm extends React.Component {
  /**
   * Component that represents the form for creating an exam.
   * The state is represented by
   *  name : The name of the exam to be created
   *  dueDate: The date on which the exam will take place
   *  startTime: The time on which the exam will start
   *  endTime: The time on which the exam will end
   *  teacher: The teacher of the course that the exam is for
   *  courseName: The name of the course
   *  courseCode: The code of the course
   *  university: The name of the university
   *  language: On which language is the exam
   *  problems: List of objects that represent the problems on the platform.
   */
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
      problems: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    /**
     * Method that handles the change of the text inputs for the problem.
     * @param event: the event on which this method is called
     */
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    /**
     * Handler of the form submittion, using asynchronous API with fetch send the
     * data to the backend.
     */
    event.preventDefault();
    let token = localStorage.getItem("token");
    let data = {
      name: this.state.name,
      due_date: this.state.dueDate,
      start_time: this.state.startTime,
      end_time: this.state.endTime,
      teacher: this.state.teacher,
      course_name: this.state.courseName,
      course_code: this.state.courseCode,
      university: this.state.university,
      language: this.state.language,
      problems: this.state.problems,
    };
    fetch("/api/exams/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(
        (response) => response.json(),
        (error) => error
      )
      .then(
        (data) => {
          console.log(Object.values(data));
          alert("Examen Creado");
          window.location.href = "/home/"; //TODO: Change redirection link!
        },
        (error) => console.log(error)
      );
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <ExamDataInputs handleInputChange={this.handleInputChange} />
        <ExamProblems />
        <FormSubmitButton />
      </Form>
    );
  }
}

export default CreateExamForm;
