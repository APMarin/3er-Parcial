import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyC8YSSBviEbs7Xv_a-cExpk7VcaUkH-Y6I",
    authDomain: "react-library-55cea.firebaseapp.com",
    databaseURL: "https://react-library-55cea.firebaseio.com",
    projectId: "react-library-55cea",
    storageBucket: "react-library-55cea.appspot.com",
    messagingSenderId: "1029568983104",
    appId: "1:1029568983104:web:48da56f97b8f7532e36fa5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();
