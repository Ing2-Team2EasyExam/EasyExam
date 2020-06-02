import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello World!</h1>
            </div>
        );
    }
}

export default App;

const container = document.getElementById("app");
ReactDOM.render(<App />, container);
