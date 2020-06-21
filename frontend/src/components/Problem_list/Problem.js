import React from "react";
import Topic from "./Topic";

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
  render() {
    return (
      <tr>
        <td width="25%">
          {" "}
          <a href="#" onClick={this.getPreview}>
            {this.props.problem.name}
          </a>
        </td>
        <td width="25%"> {this.props.problem.created_at}</td>
        <td width="25%">
          {" "}
          <Topic topics={this.props.problem.topics} />{" "}
        </td>
        <td width="25%"> {this.props.problem.author}</td>
      </tr>
    );
  }
}

export default Problem;
