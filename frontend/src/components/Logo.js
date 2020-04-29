import React from 'react';
import { styles } from "../utils/styles";
import { Link } from 'react-router-dom';

export default class Logo extends React.Component {
  render() {
    return <div style={styles.logo}>
      <Link to='/'>EasyExam</Link>
    </div>;
  }
}