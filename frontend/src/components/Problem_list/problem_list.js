import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Problem from './Problem';

class Problem_List extends React.Component{
    constructor(props){
        super(props);
    }

    create_table(){
        let table = []

        for(let i=0; i<5; i++){
            let children = <Problem key={(i+1).toString()} name={'Erick_' + (i+1).toString()} created_at='30-04-2020' topics='Sorting' autor='Jeremy'></Problem>;
            table.push(children);
        }
        return table;
    }
    render(){
        return(
            <Container>
                <Table size='sm'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Creación</th>
                            <th>Tópicos</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.create_table()}      
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default Problem_List;