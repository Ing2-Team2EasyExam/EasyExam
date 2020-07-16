import React from "react";
import Table from "react-bootstrap/Table";
import Problem from "./Problem";

class AllProblems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null,
    };
  }

  componentDidMount() {
    fetch("/api/problems/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  containTopic(topics, value) {
    return topics.some((topic) => topic.name === value);
  }

  filterByTopic(problems) {
    if (problems == null) return problems;
    let mainTopic = this.props.filterTopic;
    if (mainTopic == null) return problems;
    else {
      let value = mainTopic.value;
      return problems.filter((prob) => this.containTopic(prob.topics, value));
    }
  }

  render() {
    const items = this.state.items;
    const filteredProblems = this.filterByTopic(items);
    const mystyle = {
      overflowY: "scroll",
      height: "50vh",
      border: "solid teal 2px",
    };

    return (
      <div style={mystyle}>
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Creación</th>
              <th>Tópicos</th>
              <th>Autor</th>
            </tr>
          </thead>
          {items && (
            <tbody>
              {filteredProblems.map((item) => (
                <Problem key={item.name} problem={item} />
              ))}
            </tbody>
          )}
        </Table>
      </div>
    );
  }
}

export default AllProblems;
