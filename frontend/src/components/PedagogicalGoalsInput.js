import React from 'react';
import { Modal, Button, ButtonToolbar } from "react-bootstrap";
import { styles } from "../utils/styles";
import TopicCheckbox from "./TopicCheckbox";
import LoadingAnimation from "./LoadingAnimation";
import { withUserContext } from "./UserState";

// const topics = [
//   'Splay trees',
//   'BFS',
//   'Dijkstra',
//   'Hashing',
//   'Estructuras de datos',
//   'Diccionarios',
//   'Ordenamiento',
//   'Búsqueda en texto',
//   'Compresión de datos',
//   'Algoritmos probabilísticos',
//   'Tipos de datos abstractos',
// ];

class PedagogicalGoalsInput extends React.Component {
  constructor(props){
    super(props)
    this.state =  {
      isModalVisible: false,
      localTopics : props.value
    };
  }

  onClick = () => {
    this.setState({ isModalVisible: true });
  };

  onHideModal = () => {
    this.setState({ isModalVisible: false });
  };

  onToggleTopic = (topic, isSelected) => {
    //const { onChange, value } = this.props;
    this.setState(prev => ({localTopics: isSelected ? prev.localTopics.add(topic) : prev.localTopics.delete(topic)}))
    //onChange(isSelected ? value.add(topic) : value.delete(topic));
  };

  onCancel = () => {
    this.setState({isModalVisible: false, localTopics: this.props.value})
  }

  onSubmit = () => {
    this.setState({isModalVisible: false})
    this.props.onChange(this.state.localTopics)
  }

  render() {
    const { isModalVisible } = this.state;
    const { label, color, topics, locale } = this.props;
    const selectedTopics = topics === 'loading' ? [] : this.state.localTopics.toArray();
    const value = this.state.localTopics;

    return <div style={styles.fieldInput({ color })}>
      <div onClick={this.onClick}>
        {locale.formatTopics({ topics: selectedTopics })}
      </div>
      <Modal show={isModalVisible} onHide={this.onHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>{label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={styles.centerContent}>
            <div style={styles.topics}>
              {topics === 'loading' ? <LoadingAnimation text={locale.loadingTopics}/>
                : [ 0, 1, 2 ].map(column => <div>
                  {topics.filter((topic, index) => index % 3 === column)
                    .map(topic => <TopicCheckbox
                      topic={topic}
                      value={value.has(topic)}
                      onChangeValue={isSelected => this.onToggleTopic(topic, isSelected)}
                    />)}
                </div>)}
            </div>
            {this.props.allowInput != undefined ?
            <div>
              <label>Comida <input type="text"></input></label>
            </div> : null}
            <ButtonToolbar>
              <Button bsStyle="danger" onClick={this.onCancel}>{locale.buttonCancel}</Button>
              <Button bsStyle="success" onClick={this.onSubmit}>{locale.buttonAccept}</Button>
            </ButtonToolbar>
          </div>
        </Modal.Body>
      </Modal>
    </div>;
  }
}

export default withUserContext(PedagogicalGoalsInput);
