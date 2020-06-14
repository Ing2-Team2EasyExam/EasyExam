import React from "react";

class Topic extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.topics.map((topic) => (
          <li key={topic.name}> {topic.name} </li>
        ))}
      </ul>
    );
  }
}

export default Topic;
