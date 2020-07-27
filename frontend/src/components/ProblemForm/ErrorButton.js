import React, { useState } from "react";
import { Button, Modal, Accordion, Card } from "react-bootstrap";

function InformationToggle(props) {
  const [message, setMessage] = useState("Mostrar errores");
  const handleHeaderClick = () => {
    setMessage("No mostrar errores");
  };
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey="0"
            onClick={handleHeaderClick}
          >
            {message}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>{props.errors.error}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
function EnabledErrorButton(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="warning" block onClick={handleShow}>
        Errores Latex
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Latex error logs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InformationToggle errors={props.errors} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
function DisabledErrorButton(props) {
  return (
    <>
      <Button variant="warning" disabled block>
        Errores Latex
      </Button>
    </>
  );
}
function ErrorButton(props) {
  if (props.enabled_errors) {
    return <EnabledErrorButton errors={props.errors} />;
  } else {
    return <DisabledErrorButton />;
  }
}

export default ErrorButton;
