import React from 'react';
import { withUserContext } from "./UserState";
import { styles } from "../utils/styles";

class ProblemSummary extends React.Component {
  render() {
    const { problem, locale } = this.props;
    return <div style={styles.problemSummary}>
      <div>{problem.name}</div>
      <div>
        {locale.formatTopics({
          topics: problem.topics,
        })}
      </div>
    </div>;
  }
}

export default withUserContext(ProblemSummary);