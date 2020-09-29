/* App.js */
import React, { Component } from "react";
//import { Resizable, ResizableBox } from "react-resizable";
import { Chart } from "react-google-charts";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
//import DropdownButton from "react-bootstrap/DropdownButton";
//import Dropdown from "react-bootstrap/Dropdown";

import axios from "axios";
import ResultsTableRow from "./ResultsTableRow";

export default class UserStats extends Component {
  constructor(props) {
    super(props);
    this.getRandomColor = this.getRandomColor.bind(this);
    // this.getColorList = this.getColorList.bind(this);
    // Setting up state
    this.state = {
      email: "",
      puntaje: 0,
      tiempo: 0.0,
      tiempoRespuestas: 0.0,
      erroresRespuestas: [],
      questions: null,
      data: null,
    };
    this.labels = null;
    this.colors = null;
    this.ruta = this.props.laruta;
    this.atras = this.atras.bind(this);
    this.inicio = this.inicio.bind(this);
  }

  atras() {
    this.props.history.push("/list-students");
  }

  inicio() {
    this.props.history.push("/welcome");
  }

  componentDidMount() {
    // console.log("codigo: ", JSON.stringify(this.props.location.codigo));
    axios
      .post("http://" + this.ruta + "/estudiantes/getStudentResults", {
        studentId: this.props.location.codigo,
        actividad: "tarea1",
      })
      .then((res) => {
        // console.log("obtuve usuario " + JSON.stringify(res.data));
        this.setState({ data: res.data });
        const qe = this.state.data.map((res, i) => {
          return [i + 1, res.erroresNormal, res.erroresInvertido];
        });
        this.setState({ questions: qe });
        /*if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");
          this.props.history.push("/login/");
        } else {
          this.setState({
            email: res.data.email,
            puntaje: res.data.puntaje,
            tiempo: res.data.tiempo,
            tiempoRespuestas: res.data.tiempoRespuestas,
            erroresRespuestas: res.data.erroresRespuestas,
          });
        }*/
      })
      .catch((error) => {
        console.log(error);
      }); //*/
  }

  getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  DataTable() {
    return this.state.data.map((res, i) => {
      // console.log("valor de i: ", i);
      return <ResultsTableRow obj={res} key={i} ss={i + 1} />;
    });
  }

  render() {
    // console.log("data: ", JSON.stringify(this.state.data));
    // console.log("questions: ", JSON.stringify(this.state.questions));
    if (
      this.state.data !== null &&
      this.state.questions !== null &&
      JSON.stringify(this.state.questions) !== "[]"
    ) {
      //console.log("rerror respuestas : ", this.state.erroresRespuestas);
      this.labels = this.state.questions.map((res, i) => {
        //console.log("res, i: ", res, i);
        return [res[0], res[1], res[2], this.getRandomColor()];
      });

      // console.log("Tengo labels ", this.labels);
      // console.log("Tengo puntaje 0 ", this.state.erroresRespuestas);
      const etiquetas = [
        ["Intento", "ErroresNormal", "ErroresInvertido", { role: "style" }],
      ];
      const datos = etiquetas.concat(this.labels);

      // console.log("Tengo datos ", datos);
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ButtonGroup>
              <Button
                type="button"
                variant="outline-primary"
                onClick={this.atras}
              >
                Atrás
              </Button>
              <Button
                type="button"
                variant="outline-dark"
                onClick={this.inicio}
              >
                Inicio
              </Button>
            </ButtonGroup>
          </div>

          <Tabs defaultActiveKey="tarea1" id="tareas">
            <Tab eventKey="tarea1" title="Tarea 1">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Intento</th>
                    <th>Tiempo normal</th>
                    <th>Errores normal</th>
                    <th>Tiempo reacción normal</th>                    
                    <th>Tiempo invertido</th>
                    <th>Errores invertido</th>
                  </tr>
                </thead>
                <tbody>{this.DataTable()}</tbody>
              </Table>
              <Chart
                width={"1200px"}
                height={"1000px"}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={datos}
                options={{
                  title: "Errores por cada pregunta",
                  is3D: true,
                  chartArea: { width: "100%" },
                  height: "100%",
                  width: "100%",
                  bar: { groupWidth: "95%" },
                  legend: { position: "center" },
                  hAxis: {
                    title: "Total de errores",
                    minValue: 0,
                  },
                  vAxis: {
                    title: "Pregunta",
                  },
                }}
                // For tests
                rootProps={{ "data-testid": "1" }}
              />
            </Tab>
            <Tab eventKey="tarea2" title="Tarea 2">
              Trabajo en progreso...
            </Tab>
            <Tab eventKey="tarea3" title="Tarea 3">
              Trabajo en progreso...
            </Tab>
            <Tab eventKey="tarea4" title="Tarea 4" disabled>
              What
            </Tab>
            <Tab eventKey="tarea5" title="Tarea 5" disabled>
              What
            </Tab>
            <Tab eventKey="tarea6" title="Tarea 6" disabled>
              What
            </Tab>
          </Tabs>
        </div>
      );
    }

    let cadena = "Cargando datos...";
    if (JSON.stringify(this.state.questions) === "[]") {
      cadena = "El estudiante no tiene intentos realizados.";
    }

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonGroup>
            <Button
              type="button"
              variant="outline-primary"
              onClick={this.atras}
            >
              Atrás
            </Button>
            <Button type="button" variant="outline-dark" onClick={this.inicio}>
              Inicio
            </Button>
          </ButtonGroup>
        </div>
        <br></br>
        <h1>{cadena}</h1>        
      </div>
    );
  }
}
