import React from "react";
import { Button, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { XSquare } from "react-bootstrap-icons";

class DeleteProblemButton extends React.Component {
  constructor(props) {
    super(props);
    this.renderTooltip = this.renderTooltip.bind(this);
  }
  renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Eliminar problema
      </Tooltip>
    );
  }
  render() {
    return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 100 }}
        overlay={this.renderTooltip}
      >
        <Button variant="light" onClick={this.props.onClick}>
          <XSquare />
        </Button>
      </OverlayTrigger>
    );
  }
}

export default DeleteProblemButton;
