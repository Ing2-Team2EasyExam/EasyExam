import React from "react";
import { Form, Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";

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
    this.removeProblem = this.removeProblem.bind(this);
  }

  removeProblem(event) {
    let index = this.props.number;
    this.props.removeProblem(index);
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
    this.props.updateProblem(this.props.number, name, author);
  }
  render() {
    const { problems } = this.state;
    return (
      <>
        <Row>
          <Col sm={10}>
            <Form.Group controlId="problem1">
              <Form.Label>Problema {this.props.number + 1}</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                as="select"
                value={`${this.props.author} -!-! ${this.props.name}`}
              >
                <option key={0} value={`DEFAULT -!-! DEFAULT`}>
                  {" "}
                  No ha seleccionado Problema
                </option>
                {problems.map((problem, i) => {
                  return (
                    <option
                      key={i + 1}
                      value={`${problem.author} -!-! ${problem.name}`}
                    >
                      {problem.author} -- {problem.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <XCircleFill onClick={this.removeProblem} />
          </Col>
        </Row>
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
      problems: [{ name: "DEFAULT", author: "DEFAULT" }],
    };
    this.addProblem = this.addProblem.bind(this);
    this.removeProblem = this.removeProblem.bind(this);
    this.updateProblem = this.updateProblem.bind(this);
  }
  addProblem(event) {
    /**
     * Method on which the component add a problem select component to the interface
     */
    event.preventDefault();
    const { current, problems, maximum } = this.state;
    if (problems.length === maximum) {
      alert(`Can't put more than ${maximum}`);
      return;
    }
    problems.push({ name: "DEFAULT", author: "DEFAULT" });
    this.setState((state, props) => {
      return {
        problems: problems,
      };
    });
  }

  removeProblem(index) {
    /**
     * Method on which the component remove a problem select component of the interface
     */
    let list = this.state.problems;
    if (list.length === 1) {
      alert("Cant submit exam with 0 problems");
      return;
    }
    list.splice(index, 1);
    this.setState((state, props) => {
      return {
        problems: list,
      };
    });
  }

  updateProblem(index, name, author) {
    let list = this.state.problems;
    list[index].name = name;
    list[index].author = author;
    this.setState((state, props) => {
      return {
        problems: list,
      };
    });

    this.props.handleSelect(list);
  }

  render() {
    const problems = this.state.problems;
    return (
      <>
        <h3 style={{ center: true }}>Problemas</h3>
        {problems.map((problem, i) => {
          return (
            <SelectProblem
              key={i}
              handleSelect={this.props.handleSelect}
              number={i}
              updateProblem={this.updateProblem}
              removeProblem={this.removeProblem}
              author={problem.author}
              name={problem.name}
            />
          );
        })}
        <Button variant="primary" type="button" onClick={this.addProblem} block>
          {" "}
          Add other problem
        </Button>{" "}
      </>
    );
  }
}

export default ExamProblemInputs;
