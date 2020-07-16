import React from "react";
import CardForm from "../EEComponents/CardForm";
import CreateProblemForm from "./CreateProblemForm";
class CreateProblem extends React.Component {
  /**
   * Parent component on which the interface for the problem creation is about.
   */
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <CardForm title="Crear Pregunta ">
        <CreateProblemForm />
      </CardForm>
    );
  }
}

export default CreateProblem;
