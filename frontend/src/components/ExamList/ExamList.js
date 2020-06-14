import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
class ExamList extends React.Component {
  render() {
    return (
      <div>
        <h1>Mis Examenes</h1>
        <Link to="/exam/create">
          <Button variant="primary">Nuevo examen</Button>
        </Link>
      </div>
    );
  }
}
export default ExamList;
