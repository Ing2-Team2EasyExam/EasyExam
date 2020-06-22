import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import SaveButton from "./SaveButton";
import TopicInputs from "./TopicInputs";
import FormSubmitButton from "../ExamCreation/FormSubmitButton";
//Solo interfaz gráfica, falta conectar el backend para almacenar las preguntas
//Falta la previsualización de las preguntas ingresadas.

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: "",
      author: "",
      statement_content: "",
      solution_content: "",
      chosen_topics: [],
      images: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTopicSelection = this.handleTopicSelection.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleTopicSelection(list) {
    /**
     * Handle the event when a problem is selected in the form
     */
    this.setState({
      chosen_topics: list,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(Object.values(this.state));
    let data = {
      name: this.state.name,
      author: this.state.author,
      statement_content: this.state.statement_content,
      solution_content: this.state.solution_content,
      topics_data: this.state.chosen_topics,
      figures: this.state.images,
    };
    let token = localStorage.getItem("token");
    this.setState({
      isLoading: true,
    });
    fetch("/api/problems/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (response_data) => {
          console.log(response_data);
          this.setState({
            isLoading: false,
          });
          alert("Pregunta creada.");
        },
        (error) => {
          console.log(error);
          alert("Algo a salido mal");
          this.setState({
            isLoading: false,
          });
        }
      );
  }
  render() {
    //Style
    const style = {
      borderRadius: "25px",
      border: "2px solid teal",
      padding: "2%",
    };

    //Nombre Pregunta
    const questionName = (
      <Form.Group controlId="name">
        <Form.Label>Nombre de la pregunta:</Form.Label>
        <Form.Control
          onChange={this.handleChange}
          name="name"
          type="text"
          placeholder="Pregunta Induccion 1"
        />
      </Form.Group>
    );

    //Autor Pregunta
    const author = (
      <Form.Group controlId="author">
        <Form.Label>Autor/a:</Form.Label>
        <Form.Control
          onChange={this.handleChange}
          name="author"
          type="text"
          placeholder="Jeremy Barbay"
        />
      </Form.Group>
    );

    //Submit
    const submit = <FormSubmitButton isLoading={this.state.isLoading} />;

    //Subir Imagenes
    const image = (
      <Form.Group>
        <Form.File id="QuestionImage" label="Insertar Imagen" />
      </Form.Group>
    );

    //Placeholder para botones Latex
    const buttonsLtx = (
      <>
        <Button variant="primary">
          <b>B</b>
        </Button>{" "}
        <Button variant="secondary">
          <i>I</i>
        </Button>{" "}
        <Button variant="success">
          <u>U</u>
        </Button>{" "}
        <Button variant="warning">
          <strike>S</strike>
        </Button>{" "}
        <Button variant="danger">≡</Button> <Button variant="info">∶</Button>{" "}
        <Button variant="light"> &#10226; </Button>{" "}
        <Button variant="dark"> &#10227; </Button>{" "}
      </>
    );

    //Text Area Enunciado
    const enunciado = (
      <Form.Group controlId="enunciado">
        <Form.Label>Enunciado</Form.Label>
        <Form.Control
          onChange={this.handleChange}
          name="statement_content"
          type="text"
          as="textarea"
          rows="3"
        />
      </Form.Group>
    );

    //Solucion
    const solucion = (
      <Form.Group controlId="enunciado">
        <Form.Label>Solución </Form.Label>
        <Form.Control
          onChange={this.handleChange}
          name="solution_content"
          type="text"
          as="textarea"
          rows="3"
        />
      </Form.Group>
    );

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <div style={style}>
            {questionName}
            {author}
            <TopicInputs handleSelect={this.handleTopicSelection} />
            <p></p>
            {buttonsLtx}
            {enunciado}
            {image}
            {buttonsLtx}
            {solucion}
            {image}
          </div>
          {submit}
        </Form>
      </div>
    );
  }
}
export default QuestionForm;
