import React from "react";
import { Form, Button } from "react-bootstrap";

class SelectProblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      problems: [],
    };
  }
  componentDidMount() {
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
  render() {
    const { problems } = this.state;
    return (
      <>
        <Form.Group controlId="problem1">
          <Form.Label>Problema {this.props.number}</Form.Label>
          <Form.Control as="select">
            {problems.map((problem) => {
              return (
                <option>
                  {" "}
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
  constructor(props) {
    super(props);
    this.state = {
      maximum: 5,
      current: 1,
      problems: [<SelectProblem number="1" />],
    };
    this.addProblem = this.addProblem.bind(this);
    this.removeProblem = this.removeProblem.bind(this);
  }
  addProblem(event) {
    event.preventDefault();
    const { current, problems, maximum } = this.state;
    if (current + 1 > maximum) {
      alert(`Can't put more than ${maximum}`);
      return;
    }
    problems.push(<SelectProblem number={current + 1} />);
    this.setState((state, props) => {
      return {
        current: state.current + 1,
        problems: problems,
      };
    });
  }
  removeProblem(event) {
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
