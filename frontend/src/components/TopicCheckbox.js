import React from 'react';
import { styles } from "../utils/styles";

export default class TopicCheckbox extends React.Component {
  onChange = event => {
    const { onChangeValue } = this.props;
    onChangeValue(event.target.checked);
  };

  render() {
    const { topic, value } = this.props;

    return <div style={styles.topicCheckbox}>
      <input type='checkbox' checked={value} onChange={this.onChange} style={{margin : '5px'}}/>
      <span style={{verticalAlign: 'text-bottom'}}>{topic.name}</span>
    </div>;
  }
}
