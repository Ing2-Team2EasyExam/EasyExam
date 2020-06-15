import React from "react";
import FormInput from "./FormInput";
import { Form } from "react-bootstrap";
class ExamDataInputs extends React.Component {
  render() {
    return (
      <>
        <FormInput
          controlId="examName"
          label="Nombre del Examen"
          input_type="text"
          placeholder="Ingresar Nombre del Examen"
        />
        <FormInput
          controlId="dueDate"
          label="Fecha de realización"
          input_type="date"
          placeholder="dd/mm/aaaa"
        />
        <FormInput
          controlId="startTime"
          label="Hora de Inicio"
          input_type="time"
          placeholder="HH:MM"
        />
        <FormInput
          controlId="endTime"
          label="endTime"
          input_type="time"
          placeholder="HH:MM"
        />
        <FormInput
          controlId="teacher"
          label="Nombre profesor/a"
          input_type="text"
          placeholder="Nombre del profesor/a"
        />
        <FormInput
          controlId="courseName"
          label="Nombre del curso"
          input_type="text"
          placeholder="Nombre del curso"
        />
        <FormInput
          controlId="courseCode"
          label="Codigo del curso"
          input_type="text"
          placeholder="Codigo del curso"
        />
        <FormInput
          controlId="university"
          label="Universidad"
          input_type="text"
          placeholder="Nombre de la Universidad"
        />

        <Form.Group controlId="language">
          <Form.Label>Idioma del examen</Form.Label>
          <Form.Control as="select">
            <option>Ingles</option>
            <option>Español</option>
          </Form.Control>
        </Form.Group>
      </>
    );
  }
}
export default ExamDataInputs;
