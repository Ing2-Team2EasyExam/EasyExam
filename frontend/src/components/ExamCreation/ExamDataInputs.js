import React from "react";
import FormInput from "./FormInput";
import { Form } from "react-bootstrap";
class ExamDataInputs extends React.Component {
  /**
   * Component that represents all inputs that the user has to manually enter or type
   */
  render() {
    return (
      <>
        <FormInput
          controlId="examName"
          name="name"
          label="Nombre del Examen"
          input_type="text"
          placeholder="Ingresar Nombre del Examen"
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="dueDate"
          name="dueDate"
          label="Fecha de realización"
          input_type="date"
          placeholder="dd/mm/aaaa"
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="startTime"
          name="startTime"
          label="Hora de Inicio"
          input_type="time"
          placeholder="HH:MM"
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="endTime"
          name="endTime"
          label="endTime"
          input_type="time"
          placeholder="HH:MM"
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="teacher"
          name="teacher"
          label="Nombre profesor/a"
          input_type="text"
          placeholder="Nombre del profesor/a"
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="courseName"
          name="courseName"
          label="Nombre del curso"
          input_type="text"
          placeholder="Nombre del curso"
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="courseCode"
          name="courseCode"
          label="Codigo del curso"
          input_type="text"
          placeholder="Codigo del curso"
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="university"
          name="university"
          label="Universidad"
          input_type="text"
          placeholder="Nombre de la Universidad"
          handleChange={this.props.handleInputChange}
        />

        <Form.Group controlId="language">
          <Form.Label>Idioma del examen</Form.Label>
          <Form.Control
            name="language"
            onChange={this.props.handleInputChange}
            as="select"
          >
            <option value="EN">Ingles</option>
            <option value="ES">Español</option>
          </Form.Control>
        </Form.Group>
      </>
    );
  }
}
export default ExamDataInputs;
