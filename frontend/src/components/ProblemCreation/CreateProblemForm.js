import React from "react";
import { Form } from "react-bootstrap";
import FormSubmitButton from "../EEComponents/FormSubmitButton";
import FormInput from "../ProblemForm/FormInput";
import Statement from "./Statement";
import Solution from "./Solution";
import SelectTopics from "./SelectTopics";

class CreateProblemForm extends React.Component {
  /**
   * Component that represents the form for creating a problem.
   * The state is represented by
   *  name : The name of the problem to be created
   *  author: The author of the problem
   *  chosen_topics: List of topics of the problem
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: "",
      author: "",
      statement_content: "",
      solution_content: "",
      chosen_topics: [],
      image: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTopicSelection = this.handleTopicSelection.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
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
    return array.map((topic) => {
      return topic.label;
    });
  }
  handleImageChange(newImage) {
    this.setState({
      image: newImage,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(Object.values(this.state));
    const topics = this.transformDict(this.state.chosen_topics);
    console.log(Object.values(topics));
    let form_data = new FormData();
    console.log("Array images:");
    form_data.append("name", this.state.name);
    form_data.append("author", this.state.author);
    form_data.append("statement_content", this.state.statement_content);
    form_data.append("solution_content", this.state.solution_content);
    form_data.append("topics_data", topics);
    if (this.state.image !== null) {
      form_data.append("figures", this.state.image, this.state.image.name);
    }

    console.log(form_data);

    let token = localStorage.getItem("token");
    this.setState({
      isLoading: true,
    });
    fetch("/api/problems/create/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: form_data,
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
          alert("Algo ha salido mal");
          this.setState({
            isLoading: false,
          });
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
          input_type="text"
          handleChange={this.handleChange}
        />
        <FormInput
          controlId="author"
          name="author"
          label="Autor/a:"
          input_type="text"
          handleChange={this.handleChange}
        />
        <SelectTopics handleSelect={this.handleTopicSelection} />
        <Statement
          handleChange={this.handleChange}
          handleImageChange={this.handleImageChange}
        />
        <Solution handleChange={this.handleChange} />
        <FormSubmitButton isLoading={this.state.isLoading} />
      </Form>
    );
  }
}
export default CreateProblemForm;
