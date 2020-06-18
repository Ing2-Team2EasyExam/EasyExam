import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";

class DeleteExamButton extends React.Component {
  constructor(props) {
    super(props);
    this.renderTooltip = this.renderTooltip.bind(this);
  }

  renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Borrar examen
      </Tooltip>
    );
  }

  render() {
    return (
      <Link to="/#delete-exam">
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={this.renderTooltip}
        >
          <Button variant="light">
            <Trash />
          </Button>
        </OverlayTrigger>
      </Link>
    );
  }
}

export default DeleteExamButton;
