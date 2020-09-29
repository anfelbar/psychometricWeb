import React, { Component } from "react";
import { Link } from "react-router-dom";
//import axios from 'axios';
//import Button from 'react-bootstrap/Button';

export default class UsersTableRow extends Component {
    constructor(props) {
      super(props);
    //this.deleteQuestion = this.deleteQuestion.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    console.log("borrando y redireccionando " + this.props);
    // this.props.history.push('/list-questions')
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.datos.nombres}</td>
        <td>{this.props.obj.datos.apellidos}</td>
        <td>{this.props.obj.datos.codigo}</td>
        <td>{this.props.obj.datos.nacimiento}</td>
        <td>{this.props.obj.datos.institucion}</td>
        <td>{this.props.obj.datos.pais}</td>
        <td>{this.props.obj.datos.ciudad}</td>
        <td>
          <Link
            className="edit-link"
            to={{
              pathname: "/user-stats/",
              codigo: this.props.obj._id
            }}
          >
            Estadísticas
          </Link>
        </td>
      </tr>
    );
  }
}
