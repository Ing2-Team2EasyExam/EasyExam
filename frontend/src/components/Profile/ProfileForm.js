import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormInput from "../EEComponents/FormInput";
import FormSubmitButton from "../EEComponents/FormSubmitButton";

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLoading: false,
      first_name: "",
      last_name: "",
      email: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    const url = "/api/users/account/";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    console.log(this.state);
    return (
      <Form>
        <FormInput
          controlId="myFirstName"
          name="first_name"
          label="Nombre: "
          inputType="text"
          placeholder="Ingresa tu nombre"
          value={this.state.first_name}
          handleChange={this.handleInputChange}
        />
        <FormInput
          controlId="myLastName"
          name="last_name"
          label="Apellido: "
          inputType="text"
          placeholder="Ingresa tu apellido"
          value={this.state.last_name}
          handleChange={this.handleInputChange}
        />
        <FormSubmitButton isLoading={this.state.isLoading} />
      </Form>
    );
  }
}

export default ProfileForm;
