import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import EditExamDataInputs from "./EditExamDataInputs";
import EditFormSubmitButton from "./EditFormSubmitButton";

class EditExamForm extends React.Component {
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
      isLoaded: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProblemSelection = this.handleProblemSelection.bind(this);
  }

  handleProblemSelection(name, author) {
    /**
     * Handle the event when a problem is selected in the form
     */
    this.setState({
      problems: {
        name: name,
        author: author,
      },
    });
  }

  handleSubmit(event) {
    /**
     * Handler of the form submittion, using asynchronous API with fetch send the
     * data to the backend.
     */
    event.preventDefault();
    const url = "/api/exams/" + this.props.uuid + "/update/";
    let token = localStorage.getItem("token");
    let data = {
      //uuid: this.props.uuid,
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
    fetch(url, {
      method: "PUT",
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
          alert("Examen Editado");
          window.location.href = "/home/"; //TODO: Change redirection link!
        },
        (error) => console.log(error)
      );
  }

  handleInputChange(event) {
    /**
     * Method that handles the change of the text inputs for the problem.
     * @param {} event: the event on which this method is called
     */
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("Modificando: " + name + " -> " + value);
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    const url = "/api/exams/" + this.props.uuid + "/update";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Result es " + result);
          this.setState({
            isLoaded: true,
            name: result.name,
            dueDate: result.due_date,
            startTime: result.start_time,
            endTime: result.end_time,
            teacher: result.teacher,
            courseName: result.course_name,
            courseCode: result.course_code,
            university: result.university,
            language: result.language,
            problems: result.problems,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    console.log(this.state);
    const style = {
      borderRadius: "5px",
      border: "2px solid teal",
      padding: "2%",
      overflowY: "scroll",
      height: "70vh",
    };
    return (
      <div>
        {this.state.isLoaded && (
          <Form onSubmit={this.handleSubmit}>
            <EditFormSubmitButton />
            <div style={style}>
              <EditExamDataInputs
                data={this.state}
                handleInputChange={this.handleInputChange}
              />
            </div>
          </Form>
        )}
      </div>
    );
  }
}

export default EditExamForm;
