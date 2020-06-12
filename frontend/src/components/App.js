import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import LoginForm from "./Login/LoginForm"; // Having routing in react application

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.doPrint = this.doPrint.bind(this);
  }

  componentDidMount() {
    this.setState((state, props) => {
      return {
        isLoggedIn: this.isLoggedIn(),
      };
    });
  }

  isLoggedIn() {
    return localStorage.getItem("token") !== null;
  }

  doLogin(email, password) {
    let data = {
      email: email,
      password: password,
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
            isLoggedIn: this.isLoggedIn(),
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
          isLoggedIn: this.isLoggedIn(),
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
            <Route exact path="/">
              <LoginForm doLogin={this.doLogin} />
            </Route>
          </Switch>
        </BrowserRouter>
        <button onClick={this.doLogout}>Logout </button>
        <button onClick={this.doPrint}>Print token</button>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
ReactDOM.render(<App />, container);
