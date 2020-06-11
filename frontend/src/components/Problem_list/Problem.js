import React from "react";
class Topic extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ul>
                {this.props.topics.map(topic =>(
                    <li key={topic.name}> {topic.name} </li>
                ))}
            </ul>
        )
    }

}

class Problem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <tr>
                <td> <a href='#'>{this.props.problem.name}</a></td>
                <td> {this.props.problem.created_at}</td>
                <td> <Topic topics={this.props.problem.topics} /> </td>
                <td> {this.props.problem.author}</td>
            </tr>
        );
    }
}

export default Problem;
