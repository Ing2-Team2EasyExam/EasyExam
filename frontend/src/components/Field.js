import React from 'react';
import { styles } from "../utils/styles";

export default class Field extends React.Component {
  render() {
    const { children } = this.props;

    return <div style={styles.field}>
      {children}
    </div>;
  }
}
