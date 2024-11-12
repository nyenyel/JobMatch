// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3wwSDEl_5LlLxel4J91-sfFomEigGRug",
  authDomain: "realtime-chat-b496c.firebaseapp.com",
  databaseURL: "https://realtime-chat-b496c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtime-chat-b496c",
  storageBucket: "realtime-chat-b496c.firebasestorage.app",
  messagingSenderId: "122046066127",
  appId: "1:122046066127:web:3b1241c22e67a8673f36ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)