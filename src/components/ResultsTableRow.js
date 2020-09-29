import React, { Component } from "react";
//import { Link } from "react-router-dom";
//import axios from 'axios';
//import Button from 'react-bootstrap/Button';

export default class ResultsTableRow extends Component {
  //  constructor(props) {
  //    super(props);
  //this.deleteQuestion = this.deleteQuestion.bind(this);
  //this.onSubmit = this.onSubmit.bind(this);
  // }

  onSubmit(e) {
    e.preventDefault();

    console.log("borrando y redireccionando " + this.props);
    // this.props.history.push('/list-questions')
  }

  render() {
    return (
      <tr>
        <td>{this.props.ss}</td>
        <td>{this.props.obj.tiempoNormal}</td>
        <td>{this.props.obj.erroresNormal}</td>
        <td>{this.props.obj.tiempoReaccionNormal[0]}</td>
        <td>{this.props.obj.tiempoInvertido}</td>
        <td>{this.props.obj.erroresInvertido}</td>                
      </tr>
    );
  }
}
