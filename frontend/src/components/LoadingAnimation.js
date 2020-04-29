import React from 'react';
import { Spinner } from 'react-activity';
import {styles} from "../utils/styles";
import 'react-activity/dist/react-activity.css';

export default class LoadingAnimation extends React.Component {
  render() {
    const { text } = this.props;

    return <div style={styles.centerContent}>
      <Spinner color="#727981" size={32} speed={1} animating={true} />
      {text}
    </div>;
  }
}
