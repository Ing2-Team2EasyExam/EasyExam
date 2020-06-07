import React from "react";

class Problem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <tr>
                <td> <a href='#'>{this.props.name}</a></td>
                <td> {this.props.created_at}</td>
                <td> {this.props.topics}</td>
                <td> {this.props.autor}</td>
            </tr>
        );
    }
}

export default Problem;
