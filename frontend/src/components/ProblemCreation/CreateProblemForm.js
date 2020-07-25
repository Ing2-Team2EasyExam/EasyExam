import React from "react";
import ProblemForm from "../ProblemForm/ProblemForm";

class CreateProblemForm extends React.Component {
  /**
   * Component that represents the form for creating a problem.
   * The state is represented by
   *  name : The name of the problem to be created
   *  author: The author of the problem
   *  chosen_topics: List of topics of the problem
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: "",
      author: "",
      statement_content: "",
      solution_content: "",
      chosen_topics: [],
    };
  }

  render() {
    const url = "/api/problems/create/";
    return (
      <ProblemForm
        data={this.state}
        url={url}
        method="POST"
        successMessage="Pregunta Creada"
        errorMessage="ALgo ha salido mal"
      />
    );
  }
}
export default CreateProblemForm;
