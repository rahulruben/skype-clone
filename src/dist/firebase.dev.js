"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.auth = void 0;

var _firebase = _interopRequireDefault(require("firebase"));

require("firebase/storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firebaseConfig = {
  apiKey: "AIzaSyB-Diu2yOtREse-0rFZgaPYr3cFLDws6mA",
  authDomain: "skype-clone-fdf54.firebaseapp.com",
  databaseURL: "https://skype-clone-fdf54.firebaseio.com",
  projectId: "skype-clone-fdf54",
  storageBucket: "skype-clone-fdf54.appspot.com",
  messagingSenderId: "502081922568",
  appId: "1:502081922568:web:3764d4b5fedeb8188493bd",
  measurementId: "G-53TPJ27P1P"
};

var firebaseApp = _firebase["default"].initializeApp(firebaseConfig);

var db = firebaseApp.firestore();

var auth = _firebase["default"].auth(); // const provider = new firebase.auth.GoogleAuthProvider();


exports.auth = auth;
var _default = db;
exports["default"] = _default;