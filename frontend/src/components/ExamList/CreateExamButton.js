import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class CreateExamButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to="/exam/create">
        <Button
          variant="primary"
          size="lg"
          block
          style={{ marginTop: "15px", marginBottom: "15px" }}
        >
          Crear Examen
        </Button>
      </Link>
    );
  }
}
export default CreateExamButton;
