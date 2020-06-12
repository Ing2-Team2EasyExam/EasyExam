import React from "react";
import {InputGroup, FormControl} from 'react-bootstrap/';

class SearchComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Buscar</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    aria-label="Buscar"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
        )
    }
}

export default SearchComponent;
