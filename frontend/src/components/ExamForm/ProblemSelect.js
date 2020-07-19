import React from "react";
import { Col, Form, Row } from "react-bootstrap";

class ProblemSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
    const problems = this.props.available_problems;
    return (
      <>
        <Form.Control
          onChange={this.handleChange}
          as="select"
          value={this.props.value}
        >
          <option key={0} value={`DEFAULT -!-! DEFAULT`}>
            {" "}
            No has seleccionado ningún problema
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
      </>
    );
  }
}
export default ProblemSelect;
