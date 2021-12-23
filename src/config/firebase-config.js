// Note: Firebase integration / configuration here...!

import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCujlw9Q4pnedCtxM-8AEJupq_QJtYIRn0",
    authDomain: "social-authentication-react-js.firebaseapp.com",
    projectId: "social-authentication-react-js",
    storageBucket: "social-authentication-react-js.appspot.com",
    messagingSenderId: "556002918633",
    appId: "1:556002918633:web:85bd97d04f6ec63f573078",
    measurementId: "G-BG55H4XSEN"
};

// Initialize Firebase...!
let configuration = firebase.initializeApp(firebaseConfig);
export default configuration;