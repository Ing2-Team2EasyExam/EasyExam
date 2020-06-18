import React from "react";
import { Form, Button } from "react-bootstrap";

class SelectProblem extends React.Component {
  /**
   * Component which represent the select html of which the problems show and can be selected for
   *
   * The state represents:
   *  error: If an error is produced while the problems are retrieved
   *  problems: List of problems objects serialized, that are going to be displayed on the interface
   */
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      problems: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    /**
     * When the component mounts, the problems have to be retrieved from the backend
     */
    let token = localStorage.getItem("token");
    fetch("/api/problems/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) =>
          this.setState((state, props) => {
            return { problems: result };
          }),
        (error) => {
          this.setState((state, props) => {
            return { error: error };
          });
        }
      );
  }
  handleChange(event) {
    /**
     * On change, tell the parent which problems was chosen with the name and the author.
     */
    const target = event.target;
    const value = target.value;
    const problem_information = value.split(" -!-! ");
    const author = problem_information[0];
    const name = problem_information[1];
    this.props.handleSelect(name, author);
  }
  render() {
    const { problems } = this.state;
    return (
      <>
        <Form.Group controlId="problem1">
          <Form.Label>Problema {this.props.number}</Form.Label>
          <Form.Control onChange={this.handleChange} as="select">
            {problems.map((problem) => {
              return (
                <option value={`${problem.author} -!-! ${problem.name}`}>
                  {problem.author} -- {problem.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </>
    );
  }
}
class ExamProblemInputs extends React.Component {
  /**
   * Component on which the user selects the problem to be added to her's or he's exams.
   * The state represents:
   *  The number of maximum problems that the exam can have
   *  The number of current problems that the exam currently has
   *  The problems selection components that will be rendered
   */
  constructor(props) {
    super(props);
    this.state = {
      maximum: 5,
      current: 1,
      problems: [
        <SelectProblem handleSelect={this.props.handleSelect} number="1" />,
      ],
    };
    this.addProblem = this.addProblem.bind(this);
    this.removeProblem = this.removeProblem.bind(this);
  }
  addProblem(event) {
    /**
     * Method on which the component add a problem select component to the interface
     */
    event.preventDefault();
    const { current, problems, maximum } = this.state;
    if (current + 1 > maximum) {
      alert(`Can't put more than ${maximum}`);
      return;
    }
    problems.push(
      <SelectProblem
        handleSelect={this.props.handleSelect}
        number={current + 1}
      />
    );
    this.setState((state, props) => {
      return {
        current: state.current + 1,
        problems: problems,
      };
    });
  }
  removeProblem(event) {
    /**
     * Method on which the component remove a problem select component of the interface
     */
    event.preventDefault();
    const { current, problems, maximum } = this.state;
    if (current - 1 < 1) {
      alert("Cant submit exam with 0 problems");
      return;
    }
    problems.pop();
    this.setState((state, props) => {
      return {
        current: state.current - 1,
        problems: problems,
      };
    });
  }
  render() {
    const { problems } = this.state;
    return (
      <>
        <h3 style={{ center: true }}>Problemas</h3>
        {problems.map((problem) => problem)}
        <Button variant="primary" type="button" onClick={this.addProblem}>
          {" "}
          Add other problem
        </Button>{" "}
        <Button variant="danger" type="button" onClick={this.removeProblem}>
          {" "}
          Remove last problem
        </Button>
      </>
    );
  }
}

export default ExamProblemInputs;
