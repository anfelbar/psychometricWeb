import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import UsersTableRow from "./UsersTableRow";
import Button from "react-bootstrap/Button";
import Auth from "../Auth";

/*import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link} from 'react-router-dom';

import { GoogleLogout } from 'react-google-login';
//import { string } from "prop-types";*/

//const ruta = 'aplicacionesmoviles.usc.edu.co:8001';
//const ruta = 'localhost:8001';

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estudiantes: [],
    };
    this.atras = this.atras.bind(this);
    this.ruta = this.props.laruta;
  }

  atras() {
    this.props.history.push("/welcome");
  }

  componentDidMount() {
    const instructor = {
      instructor: Auth.getUsuario(),
    };
    axios
      .post("http://" + this.ruta + "/estudiantes/misEstudiantes", instructor)
      .then((res) => {
       // console.log("esto: %j", res.data);

        this.setState({
          estudiantes: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.estudiantes.map((res, i) => {
      return <UsersTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Codigo</th>
              <th>Nacimiento</th>
              <th>Institución</th>
              <th>País</th>
              <th>Ciudad</th>
            </tr>
          </thead>
          <tbody>{this.DataTable()}</tbody>
        </Table>
        <Button variant="primary" size="lg" block="block" onClick={this.atras}>
          Atrás
        </Button>
      </div>
    );
  }
}
