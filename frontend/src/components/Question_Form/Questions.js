import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';

//Solo interfaz gráfica, falta conectar el backend para almacenar las preguntas
//Falta la previsualización de las preguntas ingresadas.

class Questions extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
      //Nombre Pregunta
      const questionName=<Form.Group controlId="name">
      <Form.Label>Nombre de la pregunta:</Form.Label>
      <Form.Control placeholder="Pregunta Induccion 1" />
    </Form.Group>

      //Autor Pregunta
      const author=<Form.Group controlId="author">
      <Form.Label>Autor/a:</Form.Label>
      <Form.Control placeholder="Jeremy Barbay" />
    </Form.Group>

      //Submit
      const submit=<Button type="submit" className="my-1">
      Guardar
    </Button>


      //Topicos
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

      //Subir Imagenes
      const image=<Form>
      <Form.Group>
        <Form.File id="QuestionImage" label="Insertar Imagen" />
      </Form.Group>
    </Form>

      //Placeholder para botones Latex
      const buttonsLtx=<>
      <Button variant="primary"><b>B</b></Button>{' '}
      <Button variant="secondary"><i>I</i></Button>{' '}
      <Button variant="success"><u>U</u></Button>{' '}
      <Button variant="warning"><strike>S</strike></Button>{' '}
      <Button variant="danger">≡</Button> <Button variant="info">∶</Button>{' '}
      <Button variant="light"> 	&#10226;  </Button> <Button variant="dark"> 	 	&#10227;  </Button>{' '}
    </>
      //Link Agregar Topicos
      const addtopic=<a href="#addtopic">Agregar Tópico</a>

      //Text Area Enunciado
      const enunciado=<Form.Group controlId="enunciado">
      <Form.Label>Enunciado</Form.Label>
      <Form.Control as="textarea" rows="3" />
    </Form.Group>

      //Solucion
      const solucion=<Form.Group controlId="enunciado">
      <Form.Label>Solución  </Form.Label>
      <Form.Control as="textarea" rows="3" />
    </Form.Group>

     return(
           <Container style={{marginTop: '100px'}}>
            <Form>
              {submit}
              {questionName}
              {author}
              {topics}
              {addtopic}
              <p></p>
              {buttonsLtx}
              {enunciado}
              {image}
              {buttonsLtx}
              {solucion}
              {image}
              </Form>
              </Container>
               )
        
            
    }
}
export default Questions;