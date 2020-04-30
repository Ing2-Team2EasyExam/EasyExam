import React from 'react';

export default class Credits extends React.Component {
  render() {
    const { credits } = this.props;
    return <div>${credits}</div>;
  }
}
