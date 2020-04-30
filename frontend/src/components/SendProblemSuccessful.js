import React from 'react';
import { styles } from "../utils/styles";
import { FaCheckCircle } from 'react-icons/fa';
import { palette } from "../utils/colors";
import { withUserContext } from "./UserState";
import { Link } from 'react-router-dom';

class SendProblemSuccessful extends React.Component {
  render() {
    const { locale } = this.props;

    return <div style={styles.centerContent}>
      <FaCheckCircle size={256} color={palette.good}/>
      {locale.sendProblemSuccessful}
      <Link to="/">{locale.goBackHome}</Link>
    </div>;
  }
}

export default withUserContext(SendProblemSuccessful);
