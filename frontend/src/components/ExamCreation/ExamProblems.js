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
  }

  render() {
    return (
      <>
        <h5 style={{ textAlign: "center" }}>Problemas</h5>
        <Problem />
        <AddProblemButton />
      </>
    );
  }
}

export default ExamProblems;
