import React from 'react';
import Form from 'react-bootstrap/Form'

class Questions extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
      const topics=<Form.Group>
              <br />
              <Form.Control as="Topicos">
                <option>Topico1</option>
                <option>Topico2</option>
                <option>Topico3</option>
              </Form.Control>
              <br />
            </Form.Group>;
            return(topics)
        

    }
}
export default Questions;