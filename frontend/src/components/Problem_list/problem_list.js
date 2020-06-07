import React from 'react';

class Problema extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      return(
        <div>
          <ul>
            <li> <a href='#'>{this.props.name}</a></li>
            <li> {this.props.created_at}</li>
            <li> {this.props.topics}</li>
            <li> {this.props.autor}</li>
          </ul>
        </div>
      );
    }
  }

  export default Problema;