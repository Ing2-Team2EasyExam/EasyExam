import React from "react";
import CardForm from "../EEComponents/CardForm";
import CreateExamForm from "./CreateExamForm";

class CreateExam extends React.Component {
  /**
   * Parent component on which the interface for the exam creation is about.
   */
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <CardForm title="Crear Examen">
        <CreateExamForm />
      </CardForm>
    );
  }
}

export default CreateExam;
