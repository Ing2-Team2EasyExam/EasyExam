import React from "react";
import CardForm from "../EEComponents/CardForm";
import ProfileForm from "./ProfileForm";
import { PersonCircle } from "react-bootstrap-icons";
import { Row, Col, Button } from "react-bootstrap";
import AdminForward from "./AdminForward";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_admin: null,
    };
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
            is_admin: data.is_admin,
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
    return (
      <CardForm title="Perfil de Usuario">
        <Row>
          <Col sm={4}>
            <PersonCircle size={200} color={"gray"} />
          </Col>
          <Col sm={8}>
            <ProfileForm />
          </Col>
        </Row>
        <Row>
          <Button
            href="/profile/change-password"
            variant="primary"
            size="lg"
            block
          >
            Cambiar Contraseña
          </Button>
        </Row>
        <Row>
          <p></p>
        </Row>
        <Row>
          <AdminForward isAdmin={this.state.is_admin} />
        </Row>
      </CardForm>
    );
  }
}

export default Profile;
