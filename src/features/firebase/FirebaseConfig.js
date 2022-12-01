// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmtt_jwjTNiSDJmOvKRQAs_t6yEm62qs8",
    authDomain: "daily-planner-418cd.firebaseapp.com",
    projectId: "daily-planner-418cd",
    storageBucket: "daily-planner-418cd.appspot.com",
    messagingSenderId: "721926954737",
    appId: "1:721926954737:web:4843be79003ac37ed2d350",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export default firebase;
