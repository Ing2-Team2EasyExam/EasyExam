import React from 'react';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';

class Questions extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
      /*const name=<Form>
      <Form.Group controlID="Nombres">
      <Form.Row>
        <Form.Label column="lg" lg={2}>
          Nombre Pregunta:
        </Form.Label>
        <Col>
          <Form.Control size="lg" type="text" placeholder="Nombre Pregunta" />
        </Col>
      </Form.Row>
      <br />
      <Form.Row>
        <Form.Label column lg={2}>
          Autor/a:
        </Form.Label>
        <Col>
          <Form.Control type="text" placeholder="Autor/a:" />
        </Col>
      </Form.Row>
      <br />
      </Form.Group>
      </Form> */

      const topics=
      <Form>
      <Form.Group controlId="exampleForm.SelectCustomSizeSm">
        <Form.Label>Topicos</Form.Label>
        <Form.Control as="select" size="sm" custom>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>
      </Form>
      
            return(
            <Container style={{marginTop: '100px'}}>
              
            {topics}
        </Container>
              
            )
        

    }
}
export default Questions;