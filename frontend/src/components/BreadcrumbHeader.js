import React from 'react';
import { withRouter } from "react-router-dom";
import { styles } from "../utils/styles";
import { withUserContext } from "./UserState";

class BreadcrumbHeader extends React.Component {
  render() {
    const { location, locale } = this.props;
    const { pathname } = location;
    const routes = pathname.split('/').slice(1);

    // Update routes here!
    var theTitleMan = document.getElementById("theTitle")
    const index = routes[routes.length-1]
    var currentSite = locale.breadcrumbTitle[index] !== undefined ? " - " + locale.breadcrumbTitle[index] : ""
    theTitleMan.innerHTML = "EasyExam"+ currentSite

    return <span style={{ ...styles.breadcrumb, ...styles.rowCenter }}>
      {routes.map((route, index) =>
        locale.breadcrumbTitle[route] !== undefined? <div key={index.toString()}>
        <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
        <span>{route ? locale.breadcrumbTitle[route] : 'Home'}</span>
      </div> : null)}
    </span>;
  }
}

export default withRouter(withUserContext(BreadcrumbHeader));
