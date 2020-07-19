import React from "react";
import CardForm from "../EEComponents/CardForm";
import EditProblemForm from "./EditProblemForm";
class EditProblem extends React.Component {
  /**
   * Parent component of the interface for edit problem.
   */
  constructor(props) {
    super(props);
  }
  render() {
    const { uuid } = this.props.match.params;
    return (
      <CardForm title="Editar Pregunta">
        <EditProblemForm uuid={uuid} />
      </CardForm>
    );
  }
}
export default EditProblem;
