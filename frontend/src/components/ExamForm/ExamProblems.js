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
      problems: props.selected_problems,
    };
    this.addProblem = this.addProblem.bind(this);
    this.removeProblem = this.removeProblem.bind(this);
    this.updateProblem = this.updateProblem.bind(this);
    this.updatePoints = this.updatePoints.bind(this);
  }

  addProblem(event) {
    /**
     * Method on which the component add a problem select component to the interface
     */
    event.preventDefault();
    const { problems, maximum } = this.state;
    if (problems.length === maximum) {
      alert(`No se permiten más de ${maximum} problemas`);
      return;
    }
    problems.push({
      points: 0,
      problem: { name: "DEFAULT", author: "DEFAULT" },
    });
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
    list.splice(index, 1);
    this.setState((state, props) => {
      return {
        problems: list,
      };
    });
  }

  updateProblem(index, name, author) {
    let list = this.state.problems;
    let problem = {};
    problem.name = name;
    problem.author = author;
    list[index].problem = problem;
    this.setState((state, props) => {
      return {
        problems: list,
      };
    });

    this.props.handleSelect(list);
  }

  updatePoints(index, points) {
    let list = this.state.problems;
    list[index].points = points;
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
              updatePoints={this.updatePoints}
              removeProblem={this.removeProblem}
              available_problems={this.props.available_problems}
              author={problem.problem.author}
              name={problem.problem.name}
              points={problem.points}
            />
          );
        })}
        <AddProblemButton addProblem={this.addProblem} />
      </>
    );
  }
}

export default ExamProblems;
