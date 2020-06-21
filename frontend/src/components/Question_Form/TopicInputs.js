import React from "react";
import { Form, Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";

class SelectTopic extends React.Component {
  /**
   * Component which represent the select html of which the problems show and can be selected for
   *
   * The state represents:
   *  error: If an error is produced while the problems are retrieved
   *  problems: List of problems objects serialized, that are going to be displayed on the interface
   */
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      available_topics: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.removeTopic = this.removeTopic.bind(this);
  }

  removeTopic(event) {
    let index = this.props.number;
    this.props.removeTopic(index);
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

  handleChange(event) {
    /**
     * On change, tell the parent which problems was chosen with the name and the author.
     */
    const target = event.target;
    const value = target.value;
    this.props.updateTopic(this.props.number, value);
  }
  render() {
    const topics = this.state.available_topics;
    return (
      <>
        <Row>
          <Col sm={10}>
            <Form.Group controlId="topic1">
              <Form.Label>Tópico {this.props.number + 1}</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                as="select"
                value={this.props.name}
              >
                <option key={0} value="DEFAULT">
                  No ha seleccionado Tópico
                </option>
                {topics.map((topic, i) => {
                  return (
                    <option key={i + 1} value={topic.name}>
                      {topic.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <XCircleFill onClick={this.removeTopic} />
          </Col>
        </Row>
      </>
    );
  }
}
class TopicInputs extends React.Component {
  /**
   * Component on which the user selects the problem to be added to her's or he's exams.
   * The state represents:
   *  The number of maximum problems that the exam can have
   *  The number of current problems that the exam currently has
   *  The problems selection components that will be rendered
   */
  constructor(props) {
    super(props);
    this.state = {
      topics: ["DEFAULT"],
    };
    this.addTopic = this.addTopic.bind(this);
    this.removeTopic = this.removeTopic.bind(this);
    this.updateTopic = this.updateTopic.bind(this);
  }
  addTopic(event) {
    /**
     * Method on which the component add a problem select component to the interface
     */
    event.preventDefault();
    const list = this.state.topics;
    list.push("DEFAULT");
    this.setState((state, props) => {
      return {
        topics: list,
      };
    });
  }

  removeTopic(index) {
    /**
     * Method on which the component remove a problem select component of the interface
     */
    let list = this.state.topics;
    if (list.length === 1) {
      alert("Cant submit exam with 0 topics");
      return;
    }
    list.splice(index, 1);
    this.setState((state, props) => {
      return {
        topics: list,
      };
    });
  }

  updateTopic(index, name) {
    let list = this.state.topics;
    list[index] = name;
    this.setState((state, props) => {
      return {
        topics: list,
      };
    });

    this.props.handleSelect(list);
  }

  render() {
    const topics = this.state.topics;
    return (
      <>
        {topics.map((topic, i) => {
          return (
            <SelectTopic
              key={i}
              handleSelect={this.props.handleSelect}
              number={i}
              updateTopic={this.updateTopic}
              removeTopic={this.removeTopic}
              name={topic}
            />
          );
        })}
        <Button variant="primary" type="button" onClick={this.addTopic} block>
          {" "}
          Agregar Tópico
        </Button>{" "}
      </>
    );
  }
}

export default TopicInputs;
