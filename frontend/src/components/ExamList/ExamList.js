import React from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { Download, Trash } from "react-bootstrap-icons";
import Exam from "./Exam";

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
                <Exam key={item.name} exam={item} />
              ))}
              <tr>
                <td width="45%">
                  {" "}
                  <a href="#VerExamen">Examen CC4102-1 Otoño 2019</a>
                </td>
                <td width="45%"> 15-06-2020</td>
                <td width="10%">
                  <Button variant="light">
                    <Download />
                  </Button>
                  <Button variant="light">
                    <Trash />
                  </Button>
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>
    );
  }
}

export default ExamList;
