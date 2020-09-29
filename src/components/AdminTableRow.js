import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

export default class AdminTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteAdmin = this.deleteAdmin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      back: false,
    };
    // this.ruta = this.props.laruta;
    //this.ruta = 'aplicacionesmoviles.usc.edu.co:8001';
    //this.ruta = 'localhost:8001';
    this.ruta = this.props.laruta;
  }

  deleteAdmin() {
    axios
      .delete(
        "http://" + this.ruta + "/admin/delete-admin/" + this.props.obj.uid
      )
      //axios.delete('http://localhost:8000/acreditacion/admin/delete-admin/' + this.props.obj._id)
      .then((res) => {
        console.log("Admin successfully deleted!");
        this.setState({ back: true });
      })
      .catch((error) => {
        console.log(error);
      });

    // this.props.history.push('/list-questions')
  }

  onSubmit(e) {
    e.preventDefault();

    console.log("borrando y redireccionando " + this.props);
    // this.props.history.push('/list-questions')
  }

  render() {
    if (this.state.back) {
      return <Redirect to="/list-admin"></Redirect>;
    }
    return (
      <tr>
        <td>{this.props.obj.uid}</td>
        <td>{this.props.obj.correo}</td>
        <td>
          <Link className="edit-link" to={"/edit-admin/" + this.props.obj.uid}>
            Edit
          </Link>

          <Button onClick={this.deleteAdmin} size="sm" variant="primary">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
