// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ8HLvpiuwP6whUsBvGLIJluXb7oYaQQ4",
  authDomain: "react-3-92ae7.firebaseapp.com",
  projectId: "react-3-92ae7",
  storageBucket: "react-3-92ae7.firebasestorage.app",
  messagingSenderId: "595233580318",
  appId: "1:595233580318:web:1870e15f057f53da28550f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);