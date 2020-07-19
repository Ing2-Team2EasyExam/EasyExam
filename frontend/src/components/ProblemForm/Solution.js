import React from "react";
import ContentInput from "./ContentInput";
class Solution extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <ContentInput
          controlId="solution"
          label="Solución:"
          handleChange={this.props.handleChange}
          name="solution_content"
          placeholder="Escribe aquí la solución de la pregunta. Puedes usar latex."
          value={this.props.value}
        />
      </>
    );
  }
}
export default Solution;
