import React from "react";
import { Form } from "react-bootstrap";

class ExamForm extends React.Component {
  render() {
    const style = {
      // borderRadius: "25px",
      border: "2px solid black",
      padding: "2%",
    };
    return (
      <>
        <Form style={style}>
          <Form.Group controlId="formExamName">
            <Form.Label>Nombre del Examen</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar Nombre del Examen"
            />
          </Form.Group>
          <Form.Group controlId="dueDate">
            <Form.Label>Fecha de reailización</Form.Label>
            <Form.Control type="date" placeholder="dd/mm/aaaa" />
          </Form.Group>
          <Form.Group controlId="startTime">
            <Form.Label>Hora de Inicio</Form.Label>
            <Form.Control type="time" placeholder="HH:MM" />
          </Form.Group>
          <Form.Group controlId="endTime">
            <Form.Label>Hora de Termino</Form.Label>
            <Form.Control type="time" placeholder="HH:MM" />
          </Form.Group>
          <Form.Group controlId="teacher">
            <Form.Label>Nombre profesor/a</Form.Label>
            <Form.Control type="text" placeholder="Nombre del profesor/a" />
          </Form.Group>
          <Form.Group controlId="courseName">
            <Form.Label>Nombre del curso</Form.Label>
            <Form.Control type="text" placeholder="Nombre del curso" />
          </Form.Group>
          <Form.Group controlId="courseCode">
            <Form.Label>Codigo del Curso</Form.Label>
            <Form.Control type="text" placeholder="Codigo del curso" />
          </Form.Group>
          <Form.Group controlId="university">
            <Form.Label>Universidad</Form.Label>
            <Form.Control type="text" placeholder="Nombre de la Universidad" />
          </Form.Group>
          <Form.Group controlId="language">
            <Form.Label>Idioma del examen</Form.Label>
            <Form.Control as="select">
              <option>Ingles</option>
              <option>Español</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default ExamForm;
