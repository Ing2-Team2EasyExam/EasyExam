import React from "react";
import { Form } from "react-bootstrap";
import FormSubmitButton from "../EEComponents/FormSubmitButton";
import FormInput from "./FormInput";
import SelectTopics from "./SelectTopics";
import ContentInput from "./ContentInput";
import ErrorButton from "./ErrorButton";
//TODO: preview of the problem
//TODO: input validation

class ProblemForm extends React.Component {
  /**
   * Component that represents the form for creating a problem.
   * The state is represented by
   *  name : The name of the problem to be created
   *  author: The author of the problem
   *  chosen_topics: List of topics of the problem
   */
  constructor(props) {
    super(props);
    this.state = this.props.data;
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
     * Handle the event when a topic is selected in the form
     */
    this.setState({
      chosen_topics: list,
    });
  }

  transformDict(array) {
    if (array !== "" && array.length && array[0].hasOwnProperty("name")) {
      return array.map((topic) => {
        return topic.name;
      });
    } else if (
      array !== "" &&
      array.length &&
      array[0].hasOwnProperty("label")
    ) {
      return array.map((topic) => {
        return topic.label;
      });
    }
    return array;
  }

  handleSubmit(event) {
    event.preventDefault();
    let topics = this.transformDict(this.state.chosen_topics);
    const url = this.props.url;
    const method = this.props.method;
    let data = {
      name: this.state.name,
      author: this.state.author,
      statement_content: this.state.statement_content,
      solution_content: this.state.solution_content,
      topics_data: topics,
      figures: [],
    };
    let token = localStorage.getItem("token");
    this.setState({
      isLoading: true,
    });
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        this.setState({
          errors: res.json(),
        });
        throw new Error("Compilation error");
      })
      .then(
        (response_data) => {
          this.setState({
            isLoading: false,
          });
          alert(this.props.successMessage);
        },
        (error) => {
          if (error.message === "Compilation error") {
            this.state.errors.then((error_data) => {
              this.setState({
                errors: error_data,
                enabled_errors: true,
              });
            });
            this.setState({
              isLoading: false,
            });
            alert(
              "Algo ha salido mal, mire los errores de latex para mas información."
            );
          } else {
            this.setState({
              isLoading: false,
            });
            alert("Algo ha salido mal.");
          }
        }
      );
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormInput
          controlId="problemName"
          name="name"
          label="Nombre de la pregunta:"
          handleChange={this.handleChange}
          value={this.state.name}
        />
        <FormInput
          controlId="author"
          name="author"
          label="Autor/a:"
          handleChange={this.handleChange}
          value={this.state.author}
        />
        <SelectTopics
          handleSelect={this.handleTopicSelection}
          value={this.state.chosen_topics}
        />
        <ContentInput
          label="Enunciado:"
          controlId="statement"
          handleChange={this.handleChange}
          name="statement_content"
          placeholder="Escribe aquí el enunciado de la pregunta. Puedes usar latex."
          value={this.state.statement_content}
        />
        <ContentInput
          controlId="solution"
          label="Solución:"
          name="solution_content"
          placeholder="Escribe aquí la solución de la pregunta. Puedes usar latex."
          handleChange={this.handleChange}
          value={this.state.solution_content}
        />
        <FormSubmitButton isLoading={this.state.isLoading} />
        <ErrorButton
          enabled_errors={this.state.enabled_errors}
          errors={this.state.errors}
        />
      </Form>
    );
  }
}
export default ProblemForm;
