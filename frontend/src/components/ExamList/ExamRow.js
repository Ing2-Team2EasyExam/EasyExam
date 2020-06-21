import React from "react";
import { Button } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
import DeleteExamButton from "./DeleteExamButton";
import { Link } from "react-router-dom";
import DownloadExamButton from "./DownloadExamButton";

class ExamRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const url = "/exam/edit/" + this.props.exam.uuid;
    return (
      <tr>
        <td width="45%">
          <Link to={url}>{this.props.exam.name}</Link>
        </td>
        <td width="45%"> {this.props.exam.updated_at}</td>
        <td width="10%">
          <DownloadExamButton
            uuid={this.props.exam.uuid}
            exam_name={this.props.exam.name}
          />
          <DeleteExamButton exam={this.props.exam} />
        </td>
      </tr>
    );
  }
}

export default ExamRow;
