import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../Auth";

//const ruta = 'aplicacionesmoviles.usc.edu.co:8001';
//const ruta = 'localhost:8001';

export default class CreateStudent extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChangeNombres = this.onChangeNombres.bind(this);
    this.onChangeApellidos = this.onChangeApellidos.bind(this);
    this.onChangeCodigo = this.onChangeCodigo.bind(this);
    this.onChangeNacimiento = this.onChangeNacimiento.bind(this);
    this.onChangeInstitucion = this.onChangeInstitucion.bind(this);
    this.onChangePais = this.onChangePais.bind(this);
    this.onChangeCiudad = this.onChangeCiudad.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.atras = this.atras.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ruta = this.props.laruta;
    // Setting up state
    this.state = {
      nombres: "",
      apellidos: "",
      codigo: "",
      nacimiento: new Date(),
      institucion: "",
      pais: "",
      ciudad: "",
      instructor: Auth.getUsuario(),
    };
  }

  atras() {
    this.props.history.push("/welcome");
  }

  handleChange = (date) => {
    this.setState({
      nacimiento: date,
    });
  };

  onChangeNombres(e) {
    this.setState({ nombres: e.target.value });
  }

  onChangeApellidos(e) {
    this.setState({ apellidos: e.target.value });
  }

  onChangeCodigo(e) {
    this.setState({ codigo: e.target.value });
  }

  onChangeNacimiento(e) {
    this.setState({ nacimiento: e.target.value });
  }

  onChangeInstitucion(e) {
    this.setState({ institucion: e.target.value });
  }

  onChangePais(e) {
    this.setState({ pais: e.target.value });
  }
  onChangeCiudad(e) {
    this.setState({ ciudad: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // Setting up state

    const estudiante = {
      datos: {
        nombres: this.state.nombres,
        apellidos: this.state.apellidos,
        codigo: this.state.codigo,
        nacimiento: this.state.nacimiento,
        institucion: this.state.institucion,
        pais: this.state.pais,
        ciudad: this.state.ciudad,
        instructor: this.state.instructor,
      },
    };

    console.log("Estudiante a crear %j", estudiante);

    axios
      .post("http://" + this.ruta + "/estudiantes/", estudiante)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    // this.setState({id: '', category: '', type: '', difficulty: '', question: '', correct_answer: '', incorrect_answers: []})
    this.setState({
      nombres: "",
      apellidos: "",
      codigo: "",
      nacimiento: "",
      institucion: "",
      pais: "",
      ciudad: "",
    });
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="type">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              type="text"
              value={this.state.nombres}
              onChange={this.onChangeNombres}
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              value={this.state.apellidos}
              onChange={this.onChangeApellidos}
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              value={this.state.codigo}
              onChange={this.onChangeCodigo}
            />
          </Form.Group>

          <Form.Group controlId="type">
            <DatePicker
              selected={this.state.nacimiento}
              onChange={this.handleChange}
              name="nacimiento"
              dateFormat="dd/MM/yyyy"
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Institución</Form.Label>
            <Form.Control
              type="text"
              value={this.state.institucion}
              onChange={this.onChangeInstitucion}
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              value={this.state.pais}
              onChange={this.onChangePais}
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              value={this.state.ciudad}
              onChange={this.onChangeCiudad}
            />
          </Form.Group>

          <Button variant="primary" size="lg" block="block" type="submit">
            Crear estudiante
          </Button>

          <Button
            variant="primary"
            size="lg"
            block="block"
            onClick={this.atras}
          >
            Atrás
          </Button>
        </Form>
      </div>
    );
  }
}
