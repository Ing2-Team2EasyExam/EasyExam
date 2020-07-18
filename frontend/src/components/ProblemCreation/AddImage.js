import React from "react";
import { Container, Form, Button, Image, Row } from "react-bootstrap";

class AddImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  handleImageChange(event) {
    const newImage = event.target.files[0];
    console.log(this.state);
    this.setState({
      image: newImage,
    });
    console.log(this.state);
    this.props.handleImage(newImage);
  }
  render() {
    return (
      <>
        <Form.Group>
          <Form.File
            id="image"
            accept="image/png, image/jpeg"
            onChange={this.handleImageChange}
            label="Insertar Imagen"
          />
        </Form.Group>
      </>
    );
  }
}

export default AddImage;
