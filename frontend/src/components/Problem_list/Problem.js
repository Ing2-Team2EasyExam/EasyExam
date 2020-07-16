import React from "react";
import Topic from "./Topic";
import { Button } from "react-bootstrap";
import { PlusSquare } from "react-bootstrap-icons";

class Problem extends React.Component {
  constructor(props) {
    super(props);

    this.getPreview = this.getPreview.bind(this);
  }
  getPreview(event) {
    event.preventDefault();
    const url = `/api/problems/${this.props.problem.uuid}/pdf/`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        let preview_url = URL.createObjectURL(blob);
        window.open(preview_url);
      });
  }

  formatDate(dateTime) {
    let arr = dateTime.split("Z")[0];
    arr = arr.split("T");
    let date = arr[0];
    let time_arr = arr[1].split(".");
    let time = time_arr[0];

    return date.replace(/-/g, "/") + " a las " + time;
  }

  render() {
    let created_at = this.formatDate(this.props.problem.created_at);
    return (
      <tr>
        <td width="25%">
          {" "}
          <a href="#" onClick={this.getPreview}>
            {this.props.problem.name}
          </a>
        </td>
        <td width="25%"> {created_at}</td>
        <td width="25%">
          {" "}
          <Topic topics={this.props.problem.topics} />{" "}
        </td>
        <td width="20%"> {this.props.problem.author}</td>
        <td>
          <Button variant="light">
            <PlusSquare />
          </Button>
        </td>
      </tr>
    );
  }
}

export default Problem;
