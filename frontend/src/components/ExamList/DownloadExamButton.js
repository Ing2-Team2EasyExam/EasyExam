import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Download } from "react-bootstrap-icons";

class DownloadExamButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: this.props.uuid,
    };
    this.renderTooltip = this.renderTooltip.bind(this);
    this.downloadExam = this.downloadExam.bind(this);
  }

  renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Descargar examen
      </Tooltip>
    );
  }

  downloadExam(props) {
    const url = "/api/exams/" + this.state.uuid + "/solution_pdf/";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        let url = URL.createObjectURL(blob);
        window.open(url);
      });
  }

  render() {
    return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 100 }}
        overlay={this.renderTooltip}
      >
        <Button variant="light" onClick={this.downloadExam}>
          <Download />
        </Button>
      </OverlayTrigger>
    );
  }
}

export default DownloadExamButton;
