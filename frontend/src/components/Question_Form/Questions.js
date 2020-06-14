import React from 'react';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';

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
            return(
            <Container style={{marginTop: '50px'}}>
            {topics}
        </Container>
              
            )
        

    }
}
export default Questions;