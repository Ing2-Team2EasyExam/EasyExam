import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import SaveButton from "./SaveButton";

//Solo interfaz gráfica, falta conectar el backend para almacenar las preguntas
//Falta la previsualización de las preguntas ingresadas.

class QuestionEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
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
          console.log("Result es " + result);
          this.setState({
            isLoaded: true,
            name: result.name,
            author: result.author,
            statement_content: result.statement_content,
            solution_content: result.solution_content,
            topics_data: result.topics_data,
            figures: result.figures,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    fetch("/api/topics/list/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then(
        (response) => response.json(),
        (errors) => console.log(errors)
      )
      .then((data) => {
        this.setState({ available_topics: data });
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleTopicSelection(event) {
    const target = event.target;
    const value = target.value;
    const { chosen_topics } = this.state;
    chosen_topics.push(value);
    this.setState({
      chosen_topics: chosen_topics,
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
          window.location.href = "/home/";
        },
        (error) => console.log(error)
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
    const submit = (
      <Button type="submit" className="my-1">
        Guardar
      </Button>
    );

    //Topicos
    const topics = (
      <Form.Group controlId="exampleForm.SelectCustomSizeSm">
        <Form.Label>Topicos</Form.Label>
        <Form.Control
          onChange={this.handleTopicSelection}
          as="select"
          size="sm"
          custom
        >
          {this.state.available_topics.map((topic) => {
            return <option>{topic.name}</option>;
          })}
        </Form.Control>
      </Form.Group>
    );

    //Subir Imagenes
    const image = (
      <Form>
        <Form.Group>
          <Form.File id="QuestionImage" label="Insertar Imagen" />
        </Form.Group>
      </Form>
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
    //Link Agregar Topicos
    const addtopic = <a href="#addtopic">Agregar Tópico</a>;

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
          <SaveButton />
          <div style={style}>
            {questionName}
            {author}
            {topics}
            {addtopic}
            <p></p>
            {buttonsLtx}
            {enunciado}
            {image}
            {buttonsLtx}
            {solucion}
            {image}
          </div>
        </Form>
      </div>
    );
  }
}
export default QuestionEditForm;
