import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { withUserContext } from "./UserState";

function PrivateRoute({ component: Component, username, onRequireLogin, isLoginRequired, isLoginModalVisible, ...rest }) {
  if (username == null && !isLoginRequired) { onRequireLogin(); }
  if (username == null && isLoginRequired && !isLoginModalVisible) {
    return <Redirect to='/'/>;
  }

  return <Route
    {...rest}
    render={props => username != null ?
      <Component {...props}/>
      : null}
  />;
}

export default withUserContext(PrivateRoute);