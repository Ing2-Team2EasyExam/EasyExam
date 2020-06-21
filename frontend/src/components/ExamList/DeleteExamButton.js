import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";

class DeleteExamButton extends React.Component {
  constructor(props) {
    super(props);
    this.renderTooltip = this.renderTooltip.bind(this);
    this.deleteExam = this.deleteExam.bind(this);
  }

  renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Borrar examen
      </Tooltip>
    );
  }
  deleteExam() {
    const url = `/api/exams/${this.props.exam.uuid}/delete`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.ok) {
        location.reload();
      }
    });
  }
  render() {
    return (
      <OverlayTrigger
        placement="right"
        delay={{ show: 100, hide: 100 }}
        overlay={this.renderTooltip}
      >
        <Button variant="light" onClick={this.deleteExam}>
          <Trash />
        </Button>
      </OverlayTrigger>
    );
  }
}

export default DeleteExamButton;
