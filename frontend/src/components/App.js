import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"; // Having routing in react application
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "cosme@fulanito.com",
      password: "1234",
      isLoggedIn: false,
    };
    this.doLogin = this.doLogin.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.doPrint = this.doPrint.bind(this);
  }
  doLogin() {
    let data = {
      email: this.state.email,
      password: this.state.password,
    };
    let response = fetch("api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => alert(error))
      .then((data) => {
        localStorage.setItem("token", data["token"]);
        this.setState((state, props) => {
          return {
            email: state.email,
            password: state.password,
            isLoggedIn: true,
          };
        });
        alert("Logeado");
      });
  }
  doLogout() {
    let response = fetch("api/users/logout/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      localStorage.removeItem("token");
      this.setState((state, props) => {
        return {
          email: state.email,
          password: state.password,
          isLoggedIn: false,
        };
      });
      alert("Deslogeado");
    });
  }
  doPrint() {
    alert(localStorage.getItem("token"));
  }
  render() {
    return (
      <div>
        <Navbar isLoggedIn={this.state.isLoggedIn} />
        <BrowserRouter>
          <Switch>
            <Route exact path="/"> <h1>EasyExam</h1> </Route>
          </Switch>
        </BrowserRouter>
        <button onClick={this.doLogin}>Login</button>
        <button onClick={this.doLogout}>Logout </button>
        <button onClick={this.doPrint}>Print token</button>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
ReactDOM.render(<App />, container);
