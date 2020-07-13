import React from "react";
import Problem from "./Problem";
import AddProblemButton from "./AddProblemButton";

class ExamProblems extends React.Component {
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
      alert("No puedes guardar un examen sin problemas");
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
        <h5 style={{ textAlign: "center" }}>Problemas</h5>
        {problems.map((problem, i) => {
          return (
            <Problem
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
        <AddProblemButton addProblem={this.addProblem} />
      </>
    );
  }
}

export default ExamProblems;