import React from "react";
import { Form, Row, Col } from "react-bootstrap/";
import Select from "react-select";
import { Search } from "react-bootstrap-icons";

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      available_topics: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({
      selectedOption: selectedOption,
    });
    this.props.onValueChange(selectedOption);
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
      .then((response) => response.json())
      .then((data) => {
        this.setState({ available_topics: data });
      });
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
    const selectedOption = this.state.selectedOption;
    return (
      <Form>
        <Form.Group as={Row} controlId="search_by_topic">
          <Form.Label column xs="auto">
            <Search /> Buscar:
          </Form.Label>
          <Col>
            <Select
              isSearchable
              isClearable
              placeholder="Ingrese tópico..."
              value={selectedOption}
              onChange={this.handleChange}
              options={available_topics}
            />
          </Col>
        </Form.Group>
      </Form>
    );
  }
}

export default SearchComponent;
