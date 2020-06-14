import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';

class Questions extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
      const questionName=<Form.Group controlId="name">
      <Form.Label>Nombre de la pregunta:</Form.Label>
      <Form.Control placeholder="Pregunta Induccion 1" />
    </Form.Group>

      const submit=<Button type="submit" className="my-1">
      Guardar
    </Button>
      const topics=
      <Form.Group controlId="exampleForm.SelectCustomSizeSm">
        <Form.Label>Topicos</Form.Label>
        <Form.Control as="select" size="sm" custom>
          <option>Topico 1</option>
          <option>Topico 2</option>
          <option>Topico 3</option>
          <option>Topico 4</option>
          <option>Topico 5</option>
        </Form.Control>
      </Form.Group>
     return(
           <Container style={{marginTop: '100px'}}>
            <Form>
              {submit}
              {questionName}
              {topics}</Form>
              </Container>
               )
        
            
    }
}
export default Questions;