import React from "react";
import EEContainer from "../EEComponents/EEContainer";
import ExamList from "./ExamList";
import CreateExamButton from "./CreateExamButton";

class Exams extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <EEContainer title="Mis Exámenes">
        <ExamList />
        <CreateExamButton />
      </EEContainer>
    );
  }
}
export default Exams;
