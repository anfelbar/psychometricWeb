import firebase from './firebaseConfig';
import "firebase/auth";

const Auth = {

    isAuthenticated: false,
    usuario  : '',

    authenticate() {
        this.isAuthenticated = true;
    },

    signout() {
        this.isAuthenticated = false;
        firebase.auth().signOut().then(function() {
            console.log('Desautenticado');
          }).catch(function(error) {
            console.log('Un errror: ', error);
          });
    },

    getAuth() {
        return this.isAuthenticated;
    },

    setValues(usuario){
        this.usuario = usuario;
    },

    getUsuario(){
        return this.usuario;
    }
};
export default Auth;