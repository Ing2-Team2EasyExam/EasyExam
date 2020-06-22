import React from "react";
import QuestionEditForm from "./QuestionEditForm";
import EEContainer from "../EEComponents/EEContainer";

class EditQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    alert("Form Submitted");
  }
  render() {
    const { uuid } = this.props.match.params;
    return (
      <EEContainer title="Editar Pregunta">
        <QuestionEditForm uuid={uuid} />
      </EEContainer>
    );
  }
}

export default EditQuestion;
