import React from 'react';
import Menu from "./Menu";
import { images } from "../utils/images";
import { withUserContext } from "./UserState";
import {Link} from 'react-router-dom'

class Home extends React.Component {
  render() {
    const { locale } = this.props;
    const menuItems = [
      { title: locale.seeProblems, image: images.seeProblems, auth: 'login', route: '/validateProblems' },
      { title: locale.createExam, image: images.createExam, auth: 'guest', route: '/createControl' },
      { title: locale.submitProblem, image: images.submitProblem, auth: 'login', route: '/sendProblem' },
    ];

    return <div>
      <Menu menuItems={menuItems}/>
      <div style={{position: "absolute", bottom: "0"}}>
        <Link to="/easteregg">Team</Link>
      </div>
    </div>;
  }
}

export default withUserContext(Home);