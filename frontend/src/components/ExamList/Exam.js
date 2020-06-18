import React from "react";
import { Button } from "react-bootstrap";
import { Download, Trash } from "react-bootstrap-icons";

class Exam extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr>
        <td width="45%">
          <a href="#VerExamen">{this.props.exam.name}</a>
        </td>
        <td width="45%"> {this.props.exam.updated_at}</td>
        <td width="10%">
          <Button variant="light">
            <Download />
          </Button>
          <Button variant="light">
            <Trash />
          </Button>
        </td>
      </tr>
    );
  }
}

export default Exam;
