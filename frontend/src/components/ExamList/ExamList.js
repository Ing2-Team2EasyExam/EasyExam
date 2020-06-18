import React from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import ExamRow from "./ExamRow";

class ExamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null,
    };
  }

  componentDidMount() {
    fetch("/api/exams/lists/", {
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
      height: "50vh",
      border: "solid teal 2px",
    };

    return (
      <div style={mystyle}>
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Última modificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {items && (
            <tbody>
              {items.map((item) => (
                <ExamRow key={item.name} exam={item} />
              ))}
            </tbody>
          )}
        </Table>
      </div>
    );
  }
}

export default ExamList;
