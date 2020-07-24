import React from "react";
import { Form } from "react-bootstrap";
import ExamDataInputs from "./ExamDataInputs";
import ExamProblems from "./ExamProblems";
import FormSubmitButton from "./FormSubmitButton";
import AlertMessage from "../EEComponents/AlertMessage";
import CreateProblemModal from "./CreateProblemModal";

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
    this.getProblems = this.getProblems.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleShowModal() {
    this.setState({
      showModal: true,
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
    });
    this.getProblems();
  }

  closeAlert() {
    this.setState({
      showAlert: false,
    });
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

  getProblems() {
    let token = localStorage.getItem("token");
    fetch("/api/problems/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (res.status == 401) throw 401;
        return res.json();
      })
      .then(
        (result) => this.setState({ available_problems: result }),
        (error) => {
          if (error == 401) {
            localStorage.removeItem("token");
            window.location.href = "/home";
          }
        }
      );
  }

  componentDidMount() {
    /**
     * When the component mounts, the problems have to be retrieved from the backend
     */
    this.getProblems();
  }

  validate(data) {
    let errors = [];

    let name = data.name;
    if (name.trim().length == 0) errors.push("'Nombre del Examen' inválido.");

    let due_date = data.due_date;
    if (due_date.length == 0) errors.push("'Fecha de realización' inválida.");

    let start_time = data.start_time;
    if (start_time.length == 0) errors.push("'Hora de inicio' inválida.");

    let end_time = data.end_time;
    if (end_time.length == 0) errors.push("'Hora de término' inválida.");

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
    let problem_choices = this.state.problem_choices;
    let problems = problem_choices.filter(
      (item) =>
        item.problem.name !== "DEFAULT" && item.problem.author !== "DEFAULT"
    );
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
      problem_choices: problems,
    };
    let form_invalid = this.validate(data);
    if (form_invalid.length > 0) {
      this.setState({
        showAlert: true,
        infoAlert: form_invalid,
        variantAlert: "danger",
        titleAlert: "Algo ha salido mal",
      });
      window.scrollTo(0, 0);
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
          this.setState({
            isLoading: false,
            showAlert: true,
            infoAlert: [this.props.successMessage],
            variantAlert: "success",
            titleAlert: this.props.titleSuccess,
          });
          window.scrollTo(0, 0);
          //window.location.href = "/home/"; //TODO: Change redirection link!
        },
        (error) => {
          this.setState({
            isLoading: false,
          });
        }
      );
  }

  render() {
    return (
      <>
        {this.state.showAlert && (
          <AlertMessage
            variant={this.state.variantAlert}
            title={this.state.titleAlert}
            message={this.state.infoAlert}
            closeAlert={this.closeAlert}
          />
        )}
        <Form onSubmit={this.handleSubmit}>
          <ExamDataInputs
            handleInputChange={this.handleInputChange}
            data={this.state}
          />
          <ExamProblems
            handleSelect={this.handleProblemSelection}
            selected_problems={this.state.problem_choices}
            available_problems={this.state.available_problems}
            handleShowModal={this.handleShowModal}
          />
          <FormSubmitButton isLoading={this.state.isLoading} />
        </Form>
        <CreateProblemModal
          showModal={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
        />
      </>
    );
  }
}

export default ExamForm;
