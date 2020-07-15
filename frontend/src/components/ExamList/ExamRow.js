import React from "react";
import { Button } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
import DeleteExamButton from "./DeleteExamButton";
import { Link } from "react-router-dom";
import DownloadExamButton from "./DownloadExamButton";

class ExamRow extends React.Component {
  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
  }

  formatDate(dateTime) {
    let arr = dateTime.split("T");
    let date = arr[0];
    let time_arr = arr[1].split(".");
    let time = time_arr[0];

    return date.replace(/-/g, "/") + " a las " + time;
  }

  render() {
    const url = "/exam/edit/" + this.props.exam.uuid;
    let updated_at = this.formatDate(this.props.exam.updated_at);
    return (
      <tr>
        <td width="45%">
          <Link to={url}>{this.props.exam.name}</Link>
        </td>
        <td width="45%"> {updated_at}</td>
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
