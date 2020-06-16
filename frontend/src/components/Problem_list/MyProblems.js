import React from "react";
import Table from "react-bootstrap/Table";
import OwnProblem from "./OwnProblem";

class MyProblems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null,
    };
  }

  componentDidMount() {
    fetch("/api/problems/uploaded/list/", {
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

  render() {
    const { error, isLoaded, items } = this.state;
    const mystyle = {
      overflowY: "scroll",
      height: "25vh",
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
              <th>Acciones</th>
            </tr>
          </thead>
          {items && (
            <tbody>
              {items.map((item) => (
                <OwnProblem key={item.name} problem={item} />
              ))}
            </tbody>
          )}
        </Table>
      </div>
    );
  }
}

export default MyProblems;
