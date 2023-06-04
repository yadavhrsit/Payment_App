import { initializeApp } from 'firebase/app';
import firebase from 'firebase/app';
import { getAuth } from "firebase/auth";


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBFI-m13THQoH323ZBSt_DQa8YywM28PaY",
    authDomain: "turnkey-skill-385908.firebaseapp.com",
    projectId: "turnkey-skill-385908",
    storageBucket: "turnkey-skill-385908.appspot.com",
    messagingSenderId: "497867329647",
    appId: "1:497867329647:web:715d3c852fe885d34afd9a",
    measurementId: "G-V2DGN9P1FE"
}

firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default firebase;

