import React from "react";
import Topic from "./Topic";

class Problem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr>
        <td>
          {" "}
          <a href="#">{this.props.problem.name}</a>
        </td>
        <td> {this.props.problem.created_at}</td>
        <td>
          {" "}
          <Topic topics={this.props.problem.topics} />{" "}
        </td>
        <td> {this.props.problem.author}</td>
      </tr>
    );
  }
}

export default Problem;
