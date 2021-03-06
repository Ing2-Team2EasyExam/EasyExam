import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Download } from "react-bootstrap-icons";
import FileSaver from "file-saver";
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
    const url = "/api/exams/" + this.state.uuid + "/normal_pdf/";
    const solution_url = `/api/exams/${this.state.uuid}/solution_pdf/`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        FileSaver.saveAs(blob, this.props.exam_name + "_normal.pdf");
        fetch(solution_url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.blob())
          .then((blob) => {
            FileSaver.saveAs(blob, this.props.exam_name + "_solution.pdf");
          });
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
