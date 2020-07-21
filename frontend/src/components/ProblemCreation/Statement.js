import React from "react";
import { Form } from "react-bootstrap";
import AddImage from "./AddImage";
//TODO: generalize this component to be used in solution
class Statement extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.addToTextInput = this.addToTextInput.bind(this);
  }
  addToTextInput(image) {
    console.log(this.textInput);
    console.log(image);
    this.textInput.current.value +=
      "\\begin{figure}[h]\n" +
      "\\includegraphics[scale=0.5]{" +
      image.name +
      "}\n" +
      "\\end{figure}";
    console.log(this.textInput.current.value);
  }
  render() {
    return (
      <>
        <Form.Group controlId="statement">
          <Form.Label>Enunciado:</Form.Label>
          <Form.Control
            onChange={this.props.handleChange}
            name="statement_content"
            type="text"
            as="textarea"
            placeholder="Escribe aquí el enunciado de la pregunta. Puedes usar latex."
            rows="5"
            ref={this.textInput}
          />
        </Form.Group>
        <AddImage
          handleImage={this.props.handleImageChange}
          addToTextInput={this.addToTextInput}
        />
      </>
    );
  }
}
export default Statement;
