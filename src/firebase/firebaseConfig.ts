import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCeuGH4wPtV6UfqY0cV6z28o9G8MVTkVws",
  authDomain: "chatbot-be4c3.firebaseapp.com",
  databaseURL: "https://chatbot-be4c3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatbot-be4c3",
  storageBucket: "chatbot-be4c3.appspot.com",
  messagingSenderId: "1013994620006",
  appId: "1:1013994620006:web:225517ab2ef46ad6f859a7",
  measurementId: "G-6EXCFFR023",
};

const app = initializeApp(firebaseConfig);

export default app;