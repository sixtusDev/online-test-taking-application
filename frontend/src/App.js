import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import ExamPage from "./components/examPage";
import InstructionPage from "./components/instructionPage";
import NotFound from "./components/notFound";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Switch>
          <Route
            exact
            path="/exam/:courseCode/:idNumber"
            component={ExamPage}
          />
          <Route
            exact
            path="/instruction/:courseCode/:idNumber"
            component={InstructionPage}
          />
          <Route path="/not-found" component={NotFound} />
          <Route exact path="/" component={LoginForm} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
