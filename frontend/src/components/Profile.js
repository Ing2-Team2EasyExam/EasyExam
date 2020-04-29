import React from 'react';
import { styles } from "../utils/styles";
import { images } from "../utils/images";
import './Profile.css';
import { withUserContext } from "./UserState";
import { Modal } from 'react-bootstrap';
import Form from "./Form";
import { put } from "../utils/api";
import OwnedExams from "./OwnedExams";

class Profile extends React.Component {
  state = {
    isPasswordModalVisible: false,
    isSubmittingPassword: false,
    formValuesPassword: {
      oldPassword: '',
      newPassword: '',
      verifyPassword: '',
    },
  };

  onChangePasswordField = ({ fieldKey, value }) => {
    this.setState(prev => ({
      formValuesPassword: { ...prev.formValuesPassword, [ fieldKey ]: value },
    }))
  };

  onChangeLocale = event => {
    const { onChangeLocale } = this.props;
    const localeKey = event.target.value;
    onChangeLocale(localeKey);
  };

  onClickChangePassword = () => {
    this.setState({ isPasswordModalVisible: true });
  };

  onHidePasswordModal = () => {
    this.setState({ isPasswordModalVisible: false });
  };

  onSubmitPassword = async ({ oldPassword, newPassword }) => {
    const { locale, token } = this.props;
    this.setState({ isSubmittingPassword: true });
    await put('users/me/change-password/', {
      old_password: oldPassword,
      password: newPassword,
      token,
    }).then(() => {
        this.setState({ isPasswordModalVisible: false });
      })
      .catch(err => {
        if (err.status === 400) {
          alert(locale.changePasswordError);
        }
        else { throw err; }
      });
    this.setState({ isSubmittingPassword: false });
  };

  validateVerifyPassword = ({ newPassword, verifyPassword }) => {
    if (verifyPassword === newPassword) { return 'valid'; }
    if (newPassword.startsWith(verifyPassword)) { return 'partial'; }
    return 'invalid';
  };

  render() {
    const { isPasswordModalVisible, formValuesPassword, exams, err } = this.state;
    const { username, localeKey, locale, email, profileImage } = this.props;

    return <div style={{ padding: '2em', backgroundColor: '#eee' }}>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'white', borderRadius: '15px', padding: '15px', border: 'rgb(210,210,210) solid 3px'}}>
            <img src={profileImage} style={{ height: "100px", width: "100px" }}/>
            <div style={{textAlign: 'center', padding: '5px'}}>{username}</div>
            <div style={{textAlign: 'center', padding: '5px'}} >{email}</div>
            <br/>
            <a style={{ marginTop: '0.5em', marginBottom: '0.5em' }} onClick={this.onClickChangePassword}>
              {locale.changePassword}
            </a>
            <select value={localeKey} onChange={this.onChangeLocale}>
              <option value='english'>English</option>
              <option value='spanish'>Español</option>
            </select>
          </div>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="fila">
                <OwnedExams/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={isPasswordModalVisible} onHide={this.onHidePasswordModal}>
        <Modal.Header closeButton>
          <Modal.Title>{locale.changePassword}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={styles.centerContent}>
            <Form onSubmit={this.onSubmitPassword} values={formValuesPassword} onChangeField={this.onChangePasswordField}>
              <Form.Field fieldKey='oldPassword' label={locale.oldPassword} type='password'/>
              <Form.Field fieldKey='newPassword' label={locale.newPassword} type='password'/>
              <Form.Field fieldKey='verifyPassword' label={locale.verifyPassword} type='password' validate={this.validateVerifyPassword}/>
              <Form.SubmitButton/>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>;
  }
}

export default withUserContext(Profile);