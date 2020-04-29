import React from 'react';
import { styles } from "../utils/styles";
import { images } from "../utils/images";
import { withRouter } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import Field from "./Field";
import { palette } from "../utils/colors";
import { withUserContext } from "./UserState";
import Form from "./Form";
import { post } from "../utils/api";
import Credits from "./Credits";

class ProfileButton extends React.Component {
  state = {
    isModalVisible: false,
    isLoggingIn: false,
    formValues: {
      username: '',
      password: '',
    },
  };

  onPressProfile = () => {
    const { history } = this.props;
    history.push('/profile');
  };

  onPressRegister = () => {
    const { history } = this.props;
    this.setState({ isModalVisible: false });
    history.push('/register');
  };

  render() {
    const { username, credits, onPressLogin, locale, profileImage } = this.props;

    return <div style={styles.profileButton}>
      <img src={username == null ? images.profileButton : profileImage}
           style={styles.profileImage}
           onClick={username != null && this.onPressProfile}/>
      <div style={styles.profileText} onClick={onPressLogin}>
        {username != null ? <Credits credits={credits}/> : null}
        <div>{username == null ? locale.logIn : username} ▾</div>
      </div>
    </div>;
  }
}

export default withRouter(withUserContext(ProfileButton));