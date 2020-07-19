import React from "react";
import ContentInput from "./ContentInput";
//TODO: generalize this component to be used in solution
class Statement extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <ContentInput
          controlId="statement"
          label="Enunciado:"
          handleChange={this.props.handleChange}
          name="statement_content"
          placeholder="Escribe aquí el enunciado de la pregunta. Puedes usar latex."
          value={this.props.value}
        />
      </>
    );
  }
}
export default Statement;
