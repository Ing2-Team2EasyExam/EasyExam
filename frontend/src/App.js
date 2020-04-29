import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import Home from "./components/Home";
import Logo from "./components/Logo";
import ProfileButton from "./components/ProfileButton";
import { styles } from "./utils/styles";
import CreateControl from "./components/CreateControl";
import ValidateProblems from "./components/ValidateProblems";
import SendProblem from "./components/SendProblem";
import DownloadExam from "./components/DownloadExam";
import Profile from "./components/Profile";
import Register from "./components/Register";
import BreadcrumbHeader from "./components/BreadcrumbHeader";
import { localeKey } from "./utils/localization";
import UserState from "./components/UserState";
import SendProblemSuccessful from "./components/SendProblemSuccessful";
import PrivateRoute from "./components/PrivateRoute";
import Admin from './components/Admin';
import Team from './components/Team';

export const UserNameContext = React.createContext();

class App extends Component {
  render() {
    return <BrowserRouter>
      <UserState>
        <div style={styles.nav}>
          <Logo/>
          <BreadcrumbHeader/>
          <ProfileButton/>
        </div>

        <div style={styles.scrollView}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/createControl' component={CreateControl}/>
            <PrivateRoute exact path='/validateProblems' component={ValidateProblems}/>
            <PrivateRoute exact path='/sendProblem' component={SendProblem}/>
            <Route exact path='/createControl/downloadExam/:examUuid' component={DownloadExam}/>
            <Route exact path='/downloadExam/:examUuid' component={DownloadExam}/>
            <PrivateRoute exact path='/profile' component={Profile}/>
            <Route exact path='/register' component={Register}/>
            <PrivateRoute exact path='/sendProblem/success' component={SendProblemSuccessful}/>
            <PrivateRoute exact path='/admin' component={Admin}/>
            <Route exact path='/easteregg' component={Team}/>
          </Switch>
        </div>
      </UserState>
    </BrowserRouter>;
  }
}

export default App;
