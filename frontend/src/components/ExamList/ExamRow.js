import React from "react";
import { Button } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
import DeleteExamButton from "./DeleteExamButton";

class ExamRow extends React.Component {
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
          <DeleteExamButton />
        </td>
      </tr>
    );
  }
}

export default ExamRow;
