import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import SaveButton from "./SaveButton";
import EditTopicInputs from "./EditTopicInputs";
import FormSubmitButton from "../ExamCreation/FormSubmitButton";
//Solo interfaz gráfica, falta conectar el backend para almacenar las preguntas
//Falta la previsualización de las preguntas ingresadas.

class QuestionEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLoading: false,
      name: "",
      author: "",
      statement_content: "",
      solution_content: "",
      chosen_topics: [],
      images: [],
      available_topics: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTopicSelection = this.handleTopicSelection.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    const url = "/api/problems/" + this.props.uuid + "/update";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let list = [];
          result.topics.map((topic, i) => {
            list[i] = topic.name;
          });
          this.setState({
            isLoaded: true,
            name: result.name,
            author: result.author,
            statement_content: result.statement_content,
            solution_content: result.solution_content,
            topics_data: result.topics,
            chosen_topics: list,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error,
          });
        }
      );
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
    const url = "/api/problems/" + this.props.uuid + "/update/";
    console.log(Object.values(this.state));
    let data = {
      name: this.state.name,
      author: this.state.author,
      statement_content: this.state.statement_content,
      solution_content: this.state.solution_content,
      topics_data: this.state.chosen_topics,
      figures: this.state.images,
    };
    this.setState({
      isLoading: true,
    });
    let token = localStorage.getItem("token");
    fetch(url, {
      method: "PUT",
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
          alert("Pregunta Editada.");
          this.setState({
            isLoading: false,
          });
          window.location.href = "/home/";
        },
        (error) => {
          console.log(error);
          alert("Algo ocurrio mal :(");
          this.setState({
            isLoading: false,
          });
        }
      );
  }
  render() {
    console.log(this.state);
    //Style
    const style = {
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
          value={this.state.name}
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
          value={this.state.author}
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
          value={this.state.statement_content}
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
          value={this.state.solution_content}
        />
      </Form.Group>
    );

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <div style={style}>
            {questionName}
            {author}
            {this.state.isLoaded && (
              <EditTopicInputs
                data={this.state.chosen_topics}
                handleSelect={this.handleTopicSelection}
              />
            )}
            {buttonsLtx}
            {enunciado}
            {image}
            {buttonsLtx}
            {solucion}
            {image}
            {submit}
          </div>
        </Form>
      </div>
    );
  }
}
export default QuestionEditForm;
