import React from "react";
import Topic from "./Topic";
import { Link } from "react-router-dom";

class OwnProblem extends React.Component {
  constructor(props) {
    super(props);
  }
  handlePreview(event) {
    event.preventDefault();
    const preview_url = `problems/${this.props.problem.uuid}/pdf/`;
    fetch(preview_url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const blob_url = URL.createObjectURL(blob);
        window.open(blob_url);
      });
  }
  render() {
    const edit_url = "/problems/edit/" + this.props.problem.uuid;
    const actions = this.props.problem.editable ? (
      <>
        <Link to={edit_url}>&#x270E;</Link>
        <a href="#Eliminar">&#x1F5D1;</a>{" "}
      </>
    ) : (
      "No hay acciones disponibles"
    );
    return (
      <tr>
        <td width="25%">
          {" "}
          <a href="#" onClick={this.handlePreview}>
            {this.props.problem.name}
          </a>
        </td>
        <td width="25%"> {this.props.problem.created_at}</td>
        <td width="25%">
          {" "}
          <Topic topics={this.props.problem.topics} />{" "}
        </td>
        <td width="25%">{actions}</td>
      </tr>
    );
  }
}

export default OwnProblem;
