import React from "react";
import FormInput from "./FormInput";
import { Form, Col, Row } from "react-bootstrap";
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
          label="Nombre del Examen:"
          input_type="text"
          placeholder="Ingresar Nombre del Examen"
          value={this.props.data.name}
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="dueDate"
          name="dueDate"
          label="Fecha de realización:"
          input_type="date"
          placeholder="dd/mm/aaaa"
          value={this.props.data.dueDate}
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="startTime"
          name="startTime"
          label="Hora de inicio:"
          input_type="time"
          placeholder="HH:MM"
          value={this.props.data.startTime}
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="endTime"
          name="endTime"
          label="Hora de termino:"
          input_type="time"
          placeholder="HH:MM"
          value={this.props.data.endTime}
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="teacher"
          name="teacher"
          label="Nombre profesor/a:"
          input_type="text"
          placeholder="Nombre del profesor/a"
          value={this.props.data.teacher}
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="courseName"
          name="courseName"
          label="Nombre del curso:"
          input_type="text"
          placeholder="Nombre del curso"
          value={this.props.data.courseName}
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="courseCode"
          name="courseCode"
          label="Código del curso:"
          input_type="text"
          placeholder="Código del curso"
          value={this.props.data.courseCode}
          handleChange={this.props.handleInputChange}
        />
        <FormInput
          controlId="university"
          name="university"
          label="Universidad"
          input_type="text"
          placeholder="Nombre de la Universidad"
          value={this.props.data.university}
          handleChange={this.props.handleInputChange}
        />

        <Form.Group as={Row} controlId="language">
          <Form.Label column sm={3}>
            Idioma del examen:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="language"
              onChange={this.props.handleInputChange}
              as="select"
              value={this.props.data.language}
            >
              <option value="ES">Español</option>
              <option value="EN">Inglés</option>
            </Form.Control>
          </Col>
        </Form.Group>
      </>
    );
  }
}
export default ExamDataInputs;
