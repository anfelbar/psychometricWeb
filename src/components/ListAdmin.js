import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import AdminTableRow from "./AdminTableRow";
//import { string } from "prop-types";
import Button from "react-bootstrap/Button";

export default class AdminList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
    };

    //const { match: { router } } = this.props;
    //console.log("router"+this.props.laruta);
    // this.ruta = this.props.laruta;
    //this.ruta = 'aplicacionesmoviles.usc.edu.co:8001';
    //this.ruta = 'localhost:8001';
    this.ruta = this.props.laruta;
    this.atras = this.atras.bind(this);
  }

  atras() {
    this.props.history.push("/welcome");
  }

  componentDidMount() {
    axios
      .get("http://" + this.ruta + "/admin")
      //axios.get('http://localhost:8000/acreditacion/admin/')
      .then((res) => {
        console.log(res.data);
        console.log("in studentlist %j", res.data.admins);
        this.setState({
          admins: res.data.admins,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.admins.map((res, i) => {
      return <AdminTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>UID</th>
              <th>Correo</th>
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
