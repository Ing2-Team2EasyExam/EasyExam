import React from "react";
import { Form } from "react-bootstrap";
import AddImage from "./AddImage";

class ContentInput extends React.Component {
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
        <Form.Group controlId={this.props.controlId}>
          <Form.Label>{this.props.label}</Form.Label>
          <Form.Control
            onChange={this.props.handleChange}
            name={this.props.name}
            type="text"
            as="textarea"
            placeholder={this.props.placeholder}
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
export default ContentInput;
