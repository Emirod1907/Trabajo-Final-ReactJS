import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSRjQgnHjxDczl1XFvw_9uPKeQArZfEu4",
  authDomain: "react-app-9d62a.firebaseapp.com",
  projectId: "react-app-9d62a",
  storageBucket: "react-app-9d62a.firebasestorage.app",
  messagingSenderId: "146725382019",
  appId: "1:146725382019:web:0278b5a0a8bda5526078b6"
};

const app = initializeApp(firebaseConfig);

//FIRESTORE

const database = getFirestore(app)

export default database;