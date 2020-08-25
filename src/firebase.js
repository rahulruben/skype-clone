import firebase from 'firebase';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB-Diu2yOtREse-0rFZgaPYr3cFLDws6mA",
    authDomain: "skype-clone-fdf54.firebaseapp.com",
    databaseURL: "https://skype-clone-fdf54.firebaseio.com",
    projectId: "skype-clone-fdf54",
    storageBucket: "skype-clone-fdf54.appspot.com",
    messagingSenderId: "502081922568",
    appId: "1:502081922568:web:3764d4b5fedeb8188493bd",
    measurementId: "G-53TPJ27P1P"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();


export { auth };
export default db;