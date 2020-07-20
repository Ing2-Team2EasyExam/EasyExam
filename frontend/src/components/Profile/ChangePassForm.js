import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormInput from "../EEComponents/FormInput";
import FormSubmitButton from "../EEComponents/FormSubmitButton";
import AlertMessage from "../EEComponents/AlertMessage";

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
    this.closeAlert = this.closeAlert.bind(this);
  }

  closeAlert() {
    this.setState({
      showAlert: false,
    });
  }

  validate(data) {
    let errors = [];

    let old_password = data.old_password;
    if (old_password.length == 0) errors.push("'Antigua contraseña' inválida.");

    let new_password = data.new_password;
    if (new_password.length == 0) errors.push("'Nueva contraseña' inválida.");

    let new_pass_conf = this.state.new_pass_conf;
    if (new_pass_conf.length == 0)
      errors.push("'Repita nueva contraseña' inválida.");

    if (errors.length > 0) return errors;

    if (new_password === old_password)
      errors.push("Antigua y nueva contraseña son idénticas.");

    if (new_password !== new_pass_conf)
      errors.push("Nueva contraseña no coincide con la confirmación.");

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
      this.setState({
        showAlert: true,
        infoAlert: form_invalid,
        variantAlert: "danger",
        titleAlert: "Algo ha salido mal",
      });
      window.scrollTo(0, 0);
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
      .then((response) => {
        if (response.status == 400) throw 400;
        return response.json();
      })
      .then(
        (data) => {
          this.setState({
            isLoading: false,
            showAlert: true,
            infoAlert: ["Se ha cambiado su contraseña satisfactoriamente."],
            variantAlert: "success",
            titleAlert: "Cambio de contraseña",
          });
          window.scrollTo(0, 0);
        },
        (error) => {
          if (error == 400) {
            this.setState({
              showAlert: true,
              infoAlert: ["'Contraseña antigua' no es correcta"],
              variantAlert: "danger",
              titleAlert: "Algo ha salido mal",
              isLoading: false,
            });
          }
        }
      );
  }

  render() {
    return (
      <>
        {this.state.showAlert && (
          <AlertMessage
            variant={this.state.variantAlert}
            title={this.state.titleAlert}
            message={this.state.infoAlert}
            closeAlert={this.closeAlert}
          />
        )}
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
      </>
    );
  }
}

export default ChangePassForm;
