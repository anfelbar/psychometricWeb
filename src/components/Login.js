import React, { Component } from 'react';
//import GoogleLogin from 'react-google-login';
import Auth from '../Auth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import axios from 'axios';
import firebase from '../firebaseConfig';
//import fireBaseConfig from '../firebaseConfig';
import "firebase/auth";
import 'firebase/database';

//const ruta = 'localhost';

export const AuthContext = React.createContext(null);
//console.log("Firebae %j", firebase.database().ref('users'));


class Login extends Component {

   constructor(props) {
      super(props);
      //this.responseGoogle = this.responseGoogle.bind(this);
      //this.responseGoogleError = this.responseGoogleError.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeUsuario = this.onChangeUsuario.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.registrar = this.registrar.bind(this);
      this.state = {
         usuario: '',
         password: ''
      };
   }

   

   onChangeUsuario(e) {
      this.setState({ usuario: e.target.value })
   }

   onChangePassword(e) {
      this.setState({ password: e.target.value })
   }

   /*responseGoogle = async (response) => {
      //alert('Bienvenido/a ' + JSON.stringify(response.profileObj.name));
      //console.log('results? ' + JSON.stringify(response));

      console.log(response);
      Auth.authenticate();
      Auth.setValues(response.profileObj.name, response.profileObj.email);
      //this.render(<AlertDismissibleExample />);
      this.props.history.push('/welcome');
   }

   responseGoogleError = async (response) => {
      //alert('results? ' + JSON.stringify(response));
      //console.log('results? ' + JSON.stringify(response));

      //this.props.history.push('/list-questions')

      console.log(response);
   }*/

   onSubmit(e) {
      e.preventDefault();

      firebase.auth().signInWithEmailAndPassword(this.state.usuario, this.state.password)
         .then(() => {
            Auth.authenticate();
            Auth.setValues(this.state.usuario);
            this.props.history.push('/welcome');
         })
         .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Wrong user/passw.");
            console.log("Erroes: " + errorMessage + " " + errorCode);
         });
      /*// Setting up stat

      const autenticar = {
        usuario: this.state.usuario,
        password: this.state.password
      };
  
      console.log("Estudiante a crear %j", autenticar);
  
      axios.post('http://'+ruta+':8001/admin/autenticar/', autenticar)
        .then(res => {
           console.log("Autentico en frontend?",res.data.resultado);
            if (res.data.resultado){
               Auth.authenticate();
               this.props.history.push('/welcome');           
            }else{
               alert("Usuario o contraseña incorrectos.");
               this.setState({ usuario: '', password: ''});
            }
          })
        .catch(err => {
            console.log(err);
            this.setState({ usuario: '', password: ''});
         });
  
      // this.setState({id: '', category: '', type: '', difficulty: '', question: '', correct_answer: '', incorrect_answers: []})
      
*/
      //  
   }

   registrar(e) {
      //const firebaseAuth = Firebase.Auth;
      firebase.auth().createUserWithEmailAndPassword(this.state.usuario, this.state.password)
         .then(() => {
            this.setState({ usuario: '', password: '' });
         })
         .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Erroes: " + errorMessage + " " + errorCode);
         });
   }

   render() {
      return (
         <div>
            <div align="center">
               <br /><br /><br />
               <h1>Welcome<br /></h1>
               <br />               

            </div>
            <div className="form-wrapper">

               <Form onSubmit={this.onSubmit}>

                  <Form.Group controlId="usuario">

                     <Form.Control type="text" value={this.state.usuario} onChange={this.onChangeUsuario} placeholder="Email" />
                  </Form.Group>

                  <Form.Group controlId="psas">

                     <Form.Control type="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Password" />
                  </Form.Group>

                  <Button variant="primary" size="lg" block="block" type="submit">
                     Login
                  </Button>
                  <Button variant="primary" size="lg" block="block" onClick={this.registrar}>
                     Register
                  </Button>
               </Form>

            </div>
         </div>)
   }

   /* render() {
      return (
        <table>
           <tbody>
            <tr ><td className="grande">
               <br /><br /><br />
               Bienvenido a estudio psicométrico de niños.
               <br />
               Alianza Universidad Santiago de Cali y Universidad Adventista de Chile.
            </td>
            </tr>


           
            <tr>
               <td className="centered">
                  <GoogleLogin
                     clientId="482298814947-2t08sutgb6inj6ltjvc3r215ci299dds.apps.googleusercontent.com" //id gotten from Google                  
                     buttonText="Entrar con Google"
                     onSuccess={this.responseGoogle}
                     onFailure={this.responseGoogleError}
                  />

               </td>
            </tr> 
            </tbody>
         </table>
        

      )
   } */

}


export default Login;
