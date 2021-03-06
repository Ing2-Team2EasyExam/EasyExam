import React from "react";
import ExamForm from "../ExamForm/ExamForm";

class CreateExamForm extends React.Component {
  /**
   * Component that represents the form for creating an exam.
   * The state is represented by
   *  name : The name of the exam to be created
   *  dueDate: The date on which the exam will take place
   *  startTime: The time on which the exam will start
   *  endTime: The time on which the exam will end
   *  teacher: The teacher of the course that the exam is for
   *  courseName: The name of the course
   *  courseCode: The code of the course
   *  university: The name of the university
   *  language: On which language is the exam
   *  problems: List of objects that represent the problems on the platform.
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: "",
      dueDate: "2021-01-01",
      startTime: "00:00",
      endTime: "00:00",
      teacher: "",
      courseName: "",
      courseCode: "",
      university: "",
      language: "ES",
      problem_choices: [],
      available_problems: [],
    };
  }

  render() {
    return (
      <ExamForm
        data={this.state}
        url="/api/exams/create/"
        method="POST"
        titleSuccess="Examen Creado"
        successMessage="Su examen se ha creado exitosamente"
        errorMessage="Ha ocurrido un error"
      />
    );
  }
}

export default CreateExamForm;
