import React from "react";
import { Form } from "react-bootstrap";
import ExamDataInputs from "./ExamDataInputs";
import ExamProblems from "./ExamProblems";
import FormSubmitButton from "./FormSubmitButton";
import CreateProblemButton from "./CreateProblemButton";

class ExamForm extends React.Component {
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
    this.state = props.data;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProblemSelection = this.handleProblemSelection.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleProblemSelection(list) {
    /**
     * Handle the event when a problem is selected in the form
     */
    this.setState({
      problem_choices: list,
    });
  }

  handleInputChange(event) {
    /**
     * Method that handles the change of the text inputs for the problem.
     * @param {} event: the event on which this method is called
     */
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  validate(data) {
    let errors = "";

    let name = data.name;
    if (name.trim().length == 0)
      errors = errors.concat("- 'Nombre del Exámen' inválido.\n");

    let due_date = data.due_date;
    if (due_date.length == 0)
      errors = errors.concat("- 'Fecha de realización' inválida.\n");

    let start_time = data.start_time;
    if (start_time.length == 0)
      errors = errors.concat("- 'Hora de inicio' inválida.\n");

    let end_time = data.end_time;
    if (end_time.length == 0)
      errors = errors.concat("- 'Hora de término' inválida.\n");

    let teacher = data.teacher;
    if (teacher.trim().length == 0)
      errors = errors.concat("- 'Nombre profesor/a' inválido.\n");

    let course_name = data.course_name;
    if (course_name.trim().length == 0)
      errors = errors.concat("- 'Nombre del Curso' inválido.\n");

    let course_code = data.course_code;
    if (course_code.trim().length == 0)
      errors = errors.concat("- 'Código del Curso' inválido.\n");

    let university = data.university;
    if (university.trim().length == 0)
      errors = errors.concat("- 'Universidad' inválido.\n");

    let problem_choices = data.problem_choices;
    if (
      problem_choices.some(
        (item) =>
          item.problem.name === "DEFAULT" && item.problem.author === "DEFAULT"
      )
    )
      errors = errors.concat("- 'Problemas' inválido.\n");

    return errors;
  }

  handleSubmit(event) {
    /**
     * Handler of the form submittion, using asynchronous API with fetch send the
     * data to the backend.
     */
    event.preventDefault();
    const url = this.props.url;
    const method = this.props.method;
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
      problem_choices: this.state.problem_choices,
    };
    let form_invalid = this.validate(data);
    if (form_invalid.length > 0) {
      alert(form_invalid);
      return false;
    }

    this.setState({
      isLoading: true,
    });
    fetch(url, {
      method: method,
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
          this.setState({
            isLoading: false,
          });
          alert(this.props.successMessage);
          //window.location.href = "/home/"; //TODO: Change redirection link!
        },
        (error) => {
          console.log(error);
          alert(this.props.errorMessage);
          this.setState({
            isLoading: false,
          });
        }
      );
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <ExamDataInputs
            handleInputChange={this.handleInputChange}
            data={this.state}
          />
          <ExamProblems
            handleSelect={this.handleProblemSelection}
            data={this.state.problem_choices}
          />
          <FormSubmitButton isLoading={this.state.isLoading} />
        </Form>
        <CreateProblemButton />
      </>
    );
  }
}

export default ExamForm;
