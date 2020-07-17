import React from "react";
import { Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

class SelectTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      available_topics: [],
      chosen_topics: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
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

  handleChange(newValue) {
    this.setState({
      chosen_topics: newValue,
    });
    this.props.handleSelect(newValue);
  }

  transformDict(array) {
    return array.map((topic) => {
      return {
        value: topic.name,
        label: topic.name,
      };
    });
  }

  render() {
    const available_topics = this.transformDict(this.state.available_topics);
    return (
      <>
        <Form.Group controlId="topics">
          <Form.Label>Tópicos:</Form.Label>
          <CreatableSelect
            isMulti
            onChange={this.handleChange}
            options={available_topics}
          />
        </Form.Group>
      </>
    );
  }
}

export default SelectTopics;