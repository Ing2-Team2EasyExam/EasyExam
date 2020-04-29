import React from 'react';
import { styles } from '../utils/styles.js';

export default class Admin extends React.Component {
  render() {
    return <div style={styles.centerContent}>
      <h3>Django Administration</h3>
      <a>http://dev.repositorium.cl:8000/admin/</a>
    </div>;
  }
}
