import React from "react";
//import Nav from "react-bootstrap/Nav";
//import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import CreateStudent from "./components/CreateStudent";
import ListStudents from "./components/ListStudents";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import ListAdmin from "./components/ListAdmin";
import AddAdmin from "./components/AddAdmin";
import EditAdmin from "./components/EditAdmin";
import UserStats from "./components/UserStats";
//import Header from "./Header";
import Auth from "./Auth";

const ruta = "localhost:8001";
// const ruta = "URL";

var PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.getAuth() ? (
        <Component {...props} laruta={ruta} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )
    }
  />
);
PrivateRoute = Route;

function App() {
  return (
    <Router basename="/psicometrico">
      <div className="fondo">
        {/* <Header /> */}

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/welcome" component={Welcome} />
                  <PrivateRoute
                    path="/create-student"
                    component={CreateStudent}
                  />
                  <PrivateRoute
                    path="/list-students"
                    component={ListStudents}
                  />
                  <PrivateRoute path="/list-admin" component={ListAdmin} />
                  <PrivateRoute path="/add-admin" component={AddAdmin} />
                  <PrivateRoute path="/edit-admin/:id" component={EditAdmin} />
                  <PrivateRoute path="/user-stats" component={UserStats} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
