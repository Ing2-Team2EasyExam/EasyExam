import React from 'react';
import { withUserContext } from "./UserState";
import { styles } from "../utils/styles";
import { Modal } from "react-bootstrap";
import Form from "./Form";
import { post } from "../utils/api";
import { withRouter } from "react-router-dom";

const initialFormValues = {
  username: '',
  password: '',
};

class LoginModal extends React.Component {
  state = {
    isLoggingIn: false,
    isLoggingOut: false,
    formValues: initialFormValues,
    logginError: null
  };

  componentDidUpdate(prevProps) {
    if (this.props.isLoginModalVisible !== prevProps.isLoginModalVisible) {
      this.setState({ formValues: initialFormValues });
    }
  }

  onSubmit = async ({ username, password }) => {
    const { onLogin, locale } = this.props;

    this.setState({ isLoggingIn: true });
    await post('jwt-token-auth/', { username, password })
      .then(({ token }) => {
        this.setState({logginError: null})
        onLogin({ username, token });
      })
      .catch(err => {
        if (err.status === 400) {
          this.setState({logginError: locale.passwordLoginError})
        }
        else {
          throw err;
        }
      });
    this.setState({ isLoggingIn: false });
  };

  onPressLogout = () => {
    const { onLogout, history } = this.props;
    this.setState({ isLoggingOut: true });
    onLogout();
    this.setState({ isLoggingOut: false });
  };

  onChangeField = ({ fieldKey, value }) => {
    this.setState(prev => ({
      formValues: { ...prev.formValues, [ fieldKey ]: value },
    }))
  };

  render() {
    const { isLoggingIn, isLoggingOut, formValues } = this.state;
    const { isLoginModalVisible, onHideLogin, username, locale } = this.props;
    return <Modal show={isLoginModalVisible} onHide={onHideLogin} style={{ marginTop: 64, }}>
      <Modal.Header closeButton>
        <Modal.Title>{username == null ? locale.logIn : locale.logout}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={styles.centerContent}>
          {username == null ? <Form onSubmit={this.onSubmit} values={formValues} disabled={isLoggingIn} onChangeField={this.onChangeField}>
          {this.state.logginError != null ?
          <div className="alert alert-warning">
            {this.state.logginError}
          </div> : null}
            <Form.Field fieldKey='username' label={locale.username} type='title'/>
            <Form.Field fieldKey='password' label={locale.password} type='password'/>
            <Form.SubmitButton text={locale.logIn}/>
          </Form> : <button
            style={styles.button({ disabled: isLoggingOut })}
            disabled={isLoggingOut}
            onClick={this.onPressLogout}
          >{locale.logout}</button>}
        </div>
      </Modal.Body>
    </Modal>
  }
}

export default withRouter(withUserContext(LoginModal));
