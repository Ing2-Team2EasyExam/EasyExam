import React from "react";
import ProblemForm from "../ProblemForm/ProblemForm";
class EditProblemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    const url = "/api/problems/" + this.props.uuid + "/update";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            name: result.name,
            author: result.author,
            statement_content: result.statement_content,
            solution_content: result.solution_content,
            chosen_topics: result.topics,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error,
          });
        }
      );
  }
  render() {
    const url = "/api/problems/" + this.props.uuid + "/update/";
    return (
      <>
        {this.state.isLoaded && (
          <ProblemForm
            data={this.state}
            url={url}
            method="PUT"
            successMessage="Pregunta Editada"
            errorMessage="Ha ocurrido un error"
          />
        )}
      </>
    );
  }
}
export default EditProblemForm;
