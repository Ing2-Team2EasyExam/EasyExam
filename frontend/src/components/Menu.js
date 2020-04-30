import React from 'react';
import { styles } from "../utils/styles";
import MenuItem from "./MenuItem";
import { UserNameContext } from "../App";
import { withUserContext } from "./UserState";

class Menu extends React.Component {
  render() {
    const { menuItems, username } = this.props;

    return <div style={styles.menu}>
      {menuItems.map(menuItem => <MenuItem
        key={menuItem.title}
        menuItem={menuItem}
        disabled={menuItem.auth === 'login' && username == null}
      />)}
    </div>;
  }
}

export default withUserContext(Menu);
