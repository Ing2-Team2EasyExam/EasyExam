import React from "react";
import { Form, Row, Col } from "react-bootstrap/";
import Select from "react-select";
import { Search } from "react-bootstrap-icons";

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ];
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
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
          </Col>
        </Form.Group>
      </Form>
    );
  }
}

export default SearchComponent;
