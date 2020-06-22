import React from "react";
import EditExamForm from "./EditExamForm";
import CardForm from "../EEComponents/CardForm";

class EditExam extends React.Component {
  /**
   * Parent component on which the interface for the exam creation is about.
   */
  render() {
    const { uuid } = this.props.match.params;
    return (
      <CardForm title="Editar Examen">
        <EditExamForm uuid={uuid} />
      </CardForm>
    );
  }
}

export default EditExam;
