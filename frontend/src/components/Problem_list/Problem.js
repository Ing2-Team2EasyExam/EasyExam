import React from "react";
import Topic from "./Topic";
import { Button } from "react-bootstrap";
import { Files } from "react-bootstrap-icons";

class Problem extends React.Component {
  constructor(props) {
    super(props);

    this.getPreview = this.getPreview.bind(this);
    this.duplicateProblem = this.duplicateProblem.bind(this);
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

  duplicateProblem(event) {
    const uuid = this.props.problem.uuid;
    console.log(uuid);
    /*
    const url = "/preguntas/copy/";
    let token = localStorage.getItem("token");
    let data = { "uuid": uuid};
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(
        (response) => response.json()
      )
      .then(
        (data) => {
          let response_uuid = data.uuid;
          let clone_url = "/problems/edit/" + response_uuid;
          window.location.href = clone_url;
        }
      );
      */
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
          <Button variant="light" onClick={this.duplicateProblem}>
            <Files />
          </Button>
        </td>
      </tr>
    );
  }
}

export default Problem;
