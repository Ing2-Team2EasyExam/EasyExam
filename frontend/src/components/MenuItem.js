import React from 'react';
import { styles } from "../utils/styles";
import { withRouter } from "react-router-dom";

class MenuItem extends React.Component {
  onClick = () => {
    const { disabled, history, menuItem } = this.props;
    if (disabled) { return; }
    history.push(menuItem.route);
  };

  render() {
    const { menuItem, disabled } = this.props;

    return <div style={styles.menuItem} onClick={this.onClick}>
      <img style={styles.menuImage({ disabled })} src={menuItem.image}/>
      <div style={styles.menuFooter({ disabled })}>
        <div style={styles.menuTitle}>{menuItem.title}</div>
      </div>
    </div>;
  }
}
export default withRouter(MenuItem);