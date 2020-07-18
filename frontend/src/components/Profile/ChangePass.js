import React from "react";
import CardForm from "../EEComponents/CardForm";
import ChangePassForm from "./ChangePassForm";

class ChangePass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CardForm title="Cambio de Contraseña">
        <ChangePassForm />
      </CardForm>
    );
  }
}

export default ChangePass;
