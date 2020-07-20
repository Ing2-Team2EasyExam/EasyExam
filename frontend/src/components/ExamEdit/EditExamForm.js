import React from "react";
import ExamForm from "../ExamForm/ExamForm";

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
      isLoading: false,
    };
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
      .then((res) => {
        console.log(res);
        if (res.status == 401) throw 401;
        return res.json();
      })
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
            problem_choices: result.problem_choices,
            available_problems: [],
          });
        },
        (error) => {
          if (error == 401) {
            localStorage.removeItem("token");
            window.location.href = "/home";
          }
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const url = "/api/exams/" + this.props.uuid + "/update/";
    return (
      <>
        {this.state.isLoaded && (
          <ExamForm
            data={this.state}
            url={url}
            method="PUT"
            titleSuccess="Examen editado"
            successMessage="Su examen se ha editado exitosamente"
            errorMessage="Ha ocurrido un error"
          />
        )}
      </>
    );
  }
}

export default EditExamForm;
