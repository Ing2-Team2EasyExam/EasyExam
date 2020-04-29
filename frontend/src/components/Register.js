import React from 'react';
import { styles } from "../utils/styles";
import ReCAPTCHA from 'react-google-recaptcha';

export default class Register extends React.Component {
  onSubmit = event => {
    event.preventDefault();
  };

  render() {
    return <div style={styles.centerContent}>
      <div style={styles.wallOfText}>
        <form onSubmit={this.onSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ textAlign: 'center' }}>Reg&iacute;strate</h1>
            <p>Nombre:</p>
            <input type="text"/>
            <p>Correo electrónico:</p>
            <input type="text"/>
            <p>Contraseña:</p>
            <input type="password"/>
            <p>Confirmar contraseña:</p>
            <input type="password"/>
            <ReCAPTCHA
              sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
            />
            <div style={{ textAlign: 'center' }}>
              <button style={styles.placeholderButton}>
                Enviar solicitud
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>;
  }
}