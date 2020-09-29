import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
//import { Redirect } from "react-router-dom";

export default class AddAdmin extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassw = this.onChangePassw.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      nombre: "",
      email: "",
      passw: "",
    };
    // this.ruta = this.props.laruta;
    //this.ruta = 'aplicacionesmoviles.usc.edu.co:8001';
    //this.ruta = 'localhost:8001';
    this.ruta = this.props.laruta;
    this.atras = this.atras.bind(this);
  }

  atras() {
    this.props.history.push("/welcome");
  }

  onChangeNombre(e) {
    this.setState({ nombre: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassw(e) {
    this.setState({ passw: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();

    const adminNuevo = {
      nombre: this.state.nombre,
      correo: this.state.email,
      passw: this.state.passw,
    };

    axios
      .post("http://" + this.ruta + "/admin/add-admin", adminNuevo)
      //await axios.post('http://localhost:8000/acreditacion/admin/add-admin', adminNuevo)
      .then((res) => console.log(res.data));

    // this.setState({id: '', category: '', type: '', difficulty: '', question: '', correct_answer: '', incorrect_answers: []})
    this.setState({ nombre: "", email: "", passw: "" });
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="type">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.nombre}
              onChange={this.onChangeNombre}
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              value={this.state.passw}
              onChange={this.onChangePassw}
            />
          </Form.Group>

          <Button variant="danger" size="lg" block="block" type="submit">
            Add Admin
          </Button>
        </Form>
        <Button variant="primary" size="lg" block="block" onClick={this.atras}>
          Back
        </Button>
      </div>
    );
  }
}
