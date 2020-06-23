import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar/Navbar";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  useParams,
} from "react-router-dom";
import LoginForm from "./Login/LoginForm";
import ProblemList from "./Problem_list/ProblemList";
import CreateExam from "./ExamCreation/CreateExam";
import EditExam from "./ExamEdit/EditExam";
import Questions from "./ProblemCreation/Questions";
import Exams from "./ExamList/Exams";
import EditQuestion from "./ProblemEdit/EditQuestion";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.doLogin = this.doLogin.bind(this);
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
    let token = localStorage.getItem("token");
    return token !== null; //&& token !== undefined;
  }

  doLogin(email, password) {
    let data = {
      email: email,
      password: password,
    };
    let response = fetch("/api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en el login!");
        }
        response.json();
      })
      .then(
        (data) => {
          localStorage.setItem("token", data["token"]);
          this.setState((state, props) => {
            return {
              isLoggedIn: this.isLoggedIn(),
            };
          });
          window.location.href = "/home";
        },
        (error) => alert(error.message)
      );
  }

  doLogout() {
    let response = fetch("/api/users/logout/", {
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
      window.location.href = "/";
    });
  }

  doPrint() {
    alert(localStorage.getItem("token"));
  }

  render() {
    return (
      <div>
        <Navbar isLoggedIn={this.state.isLoggedIn} doLogout={this.doLogout} />
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {this.isLoggedIn() ? (
                <Redirect to="/home" />
              ) : (
                <LoginForm doLogin={this.doLogin} />
              )}
            </Route>
            <Route exac path="/exam/create">
              {this.isLoggedIn() ? <CreateExam /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/home">
              {this.isLoggedIn() ? <Exams /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/problems">
              {this.isLoggedIn() ? <ProblemList /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/problems/create">
              {this.isLoggedIn() ? <Questions /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/exam/edit/:uuid" component={EditExam} />
            <Route exact path="/problems/edit/:uuid" component={EditQuestion} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
ReactDOM.render(<App />, container);
