import React from "react";
import Topic from "./Topic";
import { Link } from "react-router-dom";
import { Pencil } from "react-bootstrap-icons";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalPDFRender from "./ModalPDFRender";
class OwnProblem extends React.Component {
  constructor(props) {
    super(props);
    this.handlePreview = this.handlePreview.bind(this);
    this.renderTooltip = this.renderTooltip.bind(this);
  }
  handlePreview(event) {
    event.preventDefault();
    const preview_url = `/api/problems/${this.props.problem.uuid}/pdf/`;
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
  renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Editar pregunta
      </Tooltip>
    );
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
    const edit_url = "/problems/edit/" + this.props.problem.uuid;
    const actions = this.props.problem.editable ? (
      <>
        <Link to={edit_url}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 100, hide: 100 }}
            overlay={this.renderTooltip}
          >
            <Button variant="light">
              <Pencil />
            </Button>
          </OverlayTrigger>
        </Link>
      </>
    ) : (
      "No hay acciones disponibles"
    );
    let created_at = this.formatDate(this.props.problem.created_at);
    return (
      <tr>
        <td width="30%">
          {" "}
          <ModalPDFRender
            uuid={this.props.problem.uuid}
            problemName={this.props.problem.name}
          />
        </td>
        <td width="30%"> {created_at}</td>
        <td width="30%">
          {" "}
          <Topic topics={this.props.problem.topics} />{" "}
        </td>
        <td width="10%">{actions}</td>
      </tr>
    );
  }
}

export default OwnProblem;
