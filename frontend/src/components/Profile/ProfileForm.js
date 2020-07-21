import React from "react";
import { Form } from "react-bootstrap";
import FormInput from "../EEComponents/FormInput";
import FormSubmitButton from "../EEComponents/FormSubmitButton";
import AlertMessage from "../EEComponents/AlertMessage";

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      first_name: "",
      last_name: "",
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

    let first_name = data.first_name;
    if (first_name.trim().length == 0) errors.push("'Nombre' inválido.");

    let last_name = data.last_name;
    if (last_name.length == 0) errors.push("'Apellido' inválido.");

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

  componentDidMount() {
    const url = "/api/users/account/";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status == 401) throw 401;
        return res.json();
      })
      .then(
        (data) => {
          this.setState({
            first_name: data.first_name,
            last_name: data.last_name,
          });
        },
        (error) => {
          if (error == 401) {
            localStorage.removeItem("token");
            window.location.href = "/home";
          }
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = "/api/users/account/";
    let token = localStorage.getItem("token");
    let data = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
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
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({
            isLoading: false,
            showAlert: true,
            infoAlert: ["Se ha guardado su información satisfactoriamente."],
            variantAlert: "success",
            titleAlert: "Cambio de Nombre y Apellido",
          });
          window.scrollTo(0, 0);
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
            controlId="myFirstName"
            name="first_name"
            label="Nombre: "
            input_type="text"
            placeholder="Ingresa tu nombre"
            value={this.state.first_name}
            handleChange={this.handleInputChange}
          />
          <FormInput
            controlId="myLastName"
            name="last_name"
            label="Apellido: "
            input_type="text"
            placeholder="Ingresa tu apellido"
            value={this.state.last_name}
            handleChange={this.handleInputChange}
          />
          <FormSubmitButton isLoading={this.state.isLoading} />
        </Form>
      </>
    );
  }
}

export default ProfileForm;
