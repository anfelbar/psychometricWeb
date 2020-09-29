import React, { Component } from "react";
import Auth from "../Auth";
//import { GoogleLogout } from 'react-google-login';
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.registrar = this.registrar.bind(this);
    this.estudiantes = this.estudiantes.bind(this);
    this.estadisticas = this.estadisticas.bind(this);
    this.listAdmin = this.listAdmin.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
    this.logout = this.logout.bind(this);
  }

  registrar() {
    this.props.history.push("/create-student");
  }

  estudiantes() {
    this.props.history.push("/list-students");
  }

  estadisticas() {
    this.props.history.push("/welcome");
  }

  listAdmin() {
    this.props.history.push("/list-admin");
  }

  addAdmin() {
    this.props.history.push("/add-admin");
  }

  logout() {
    Auth.signout();
    this.props.history.push("/login");
  }

  render() {
    return (
      <div>
        <table align="center">
          <tbody>
            <tr text-align="center">
              <td align="center">
                <br></br>
                
              </td>
            </tr>

            <tr></tr>
          </tbody>
        </table>

        <div>
          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              title="Users"
              id="bg-nested-dropdown"
              variant="outline-primary"
            >
              <Dropdown.Item
                eventKey="1"
                onSelect={() => {
                  this.estudiantes();
                }}
              >
                See users
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onSelect={() => {
                  this.registrar();
                }}
              >
                Register user
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              as={ButtonGroup}
              title="Teachers"
              id="bg-nested-dropdown"
              variant="outline-success"
            >
              <Dropdown.Item
                onSelect={(evt) => {
                  this.listAdmin();
                }}
              >
                Admins
              </Dropdown.Item>
              {/*  <Dropdown.Item
                                onSelect={(evt) => {
                                    this.addAdmin();
                                }
                                }>Registrar instructor
                             </Dropdown.Item> */}
            </DropdownButton>
            <DropdownButton
              as={ButtonGroup}
              title="Stats"
              id="bg-nested-dropdown"
              variant="outline-warning"
            >
              <Dropdown.Item onSelect={(evt) => {}}>
                Statistics
              </Dropdown.Item>
              <Dropdown.Item onSelect={(evt) => {}}>
                More to come
              </Dropdown.Item>
            </DropdownButton>
            <Button type="button" variant="outline-dark" onClick={this.logout}>
              Exit
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default Welcome;
