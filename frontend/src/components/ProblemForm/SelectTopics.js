import React from "react";
import { Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

class SelectTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      available_topics: [],
      chosen_topics: this.props.value,
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
      .then((res) => {
        if (res.status == 401) throw 401;
        return res.json();
      })
      .then(
        (data) => {
          this.setState({ available_topics: data });
        },
        (error) => {
          if (error == 401) {
            localStorage.removeItem("token");
            window.location.href = "/home";
          }
        }
      );
  }

  handleChange(newValue) {
    this.setState({
      chosen_topics: newValue,
    });
    this.props.handleSelect(newValue);
  }

  transformDict(array) {
    if (array !== "" && array.length > 0 && array[0].hasOwnProperty("name")) {
      return array.map((topic) => {
        return {
          value: topic.name,
          label: topic.name,
        };
      });
    }
    return array;
  }

  render() {
    const available_topics = this.transformDict(this.state.available_topics);
    const chosen_topics = this.transformDict(this.state.chosen_topics);
    return (
      <>
        <Form.Group controlId="topics">
          <Form.Label>Tópicos:</Form.Label>
          <CreatableSelect
            isMulti
            defaultValue={chosen_topics}
            onChange={this.handleChange}
            options={available_topics}
          />
        </Form.Group>
      </>
    );
  }
}

export default SelectTopics;
