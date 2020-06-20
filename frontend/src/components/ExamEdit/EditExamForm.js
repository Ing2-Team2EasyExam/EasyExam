import React from "react";
import { Form, Button, Col } from "react-bootstrap";

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
        <h2>{this.props.uuid}</h2>
      </div>
    );
  }
}

export default EditExamForm;
