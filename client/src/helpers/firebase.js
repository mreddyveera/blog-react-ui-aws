// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv.js";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "mreddyveera-mern-blog.firebaseapp.com",
  projectId: "mreddyveera-mern-blog",
  storageBucket: "mreddyveera-mern-blog.firebasestorage.app",
  messagingSenderId: "304256507536",
  appId: "1:304256507536:web:5cd0fa28f5a04c0b4dc215"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {auth, provider};