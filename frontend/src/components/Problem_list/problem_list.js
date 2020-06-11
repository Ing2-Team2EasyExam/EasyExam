import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Problem from './Problem';
import Button from 'react-bootstrap/Button';
import {InputGroup, FormControl} from 'react-bootstrap/';

class Problem_List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: null,
        };
    }

    componentDidMount(){
        fetch('/api/problems/list', {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`,
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render(){
        const {error, isLoaded, items} = this.state;
        const mystyle = {
            overflowY: "scroll",
            height: "400px"
        };
        const searchComponent = <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Buscar</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                    aria-label="Buscar"
                                    aria-describedby="inputGroup-sizing-default"
                                    />
                                </InputGroup>;
        const addProblem =  <Button href="#" variant='primary' size='lg' block style={{marginTop:'15px', marginBottom: '15px'}}>
                                Agregar Nueva Pregunta
                            </Button>;

        return(
            <Container style={{marginTop: '50px'}}>
                {searchComponent}
                <div style={mystyle}>
                    <Table bordered size='sm'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Creación</th>
                                <th>Tópicos</th>
                                <th>Autor</th>
                            </tr>
                        </thead>
                        {items &&
                            <tbody>
                                {items.map(item => (
                                    <Problem key={item.name} problem={item} />
                                ))}
                            </tbody>
                        }
                    </Table>
                </div>
                {addProblem}
            </Container>
        )
    }
}

export default Problem_List;
