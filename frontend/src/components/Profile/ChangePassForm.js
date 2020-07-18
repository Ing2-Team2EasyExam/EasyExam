import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormInput from "../EEComponents/FormInput";
import FormSubmitButton from "../EEComponents/FormSubmitButton";

class ChangePassForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLoading: false,
      old_password: "",
      new_password: "",
      new_pass_conf: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate(data) {
    let errors = "";

    let old_password = data.old_password;
    if (old_password.length == 0)
      errors = errors.concat("- 'Antigua contraseña' inválida.\n");

    let new_password = data.new_password;
    if (new_password.length == 0)
      errors = errors.concat("- 'Nueva contraseña' inválida.\n");

    let new_pass_conf = this.state.new_pass_conf;
    if (new_pass_conf.length == 0)
      errors = errors.concat("- 'Repita nueva contraseña' inválida.\n");

    if (errors.length > 0) return errors;

    if (new_password === old_password)
      errors = errors.concat("- Antigua y nueva contraseña son idénticas.\n");

    if (new_password !== new_pass_conf)
      errors = errors.concat(
        "- Nueva contraseña no coincide con la confirmación.\n"
      );

    return errors;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = "/api/users/account/change-password/";
    let token = localStorage.getItem("token");
    let data = {
      old_password: this.state.old_password,
      new_password: this.state.new_password,
    };
    let form_invalid = this.validate(data);
    if (form_invalid.length > 0) {
      alert(form_invalid);
      return false;
    }

    this.setState({
      isLoading: true,
    });
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({
            isLoading: false,
          });
          alert("Se ha guardado exitósamente");
        },
        (error) => {
          console.log(error);
          alert("Ha ocurrido un error");
          this.setState({
            isLoading: false,
          });
        }
      );
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormInput
          controlId="oldPass"
          name="old_password"
          label="Antigua contraseña: "
          input_type="password"
          placeholder=""
          value={this.state.old_password}
          handleChange={this.handleInputChange}
        />
        <FormInput
          controlId="newPass"
          name="new_password"
          label="Nueva contraseña: "
          input_type="password"
          placeholder=""
          value={this.state.new_password}
          handleChange={this.handleInputChange}
        />
        <FormInput
          controlId="newPassConf"
          name="new_pass_conf"
          label="Repita nueva contraseña: "
          input_type="password"
          placeholder=""
          value={this.state.new_pass_conf}
          handleChange={this.handleInputChange}
        />
        <FormSubmitButton isLoading={this.state.isLoading} />
      </Form>
    );
  }
}

export default ChangePassForm;
