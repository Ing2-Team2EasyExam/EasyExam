import React from "react";
import CardForm from "../EEComponents/CardForm";
import ProfileForm from "./ProfileForm";
import { PersonCircle } from "react-bootstrap-icons";
import { Row, Col, Button } from "react-bootstrap";

class Profile extends React.Component {
  constructor(props) {
    super(props);
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
      </CardForm>
    );
  }
}

export default Profile;
