import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA9bK9pmySk9YE3tFSpqWMtVPO4LmyOQN4",
  authDomain: "agroman-edab9.firebaseapp.com",
  projectId: "agroman-edab9",
  storageBucket: "agroman-edab9.firebasestorage.app",
  messagingSenderId: "310261849894",
  appId: "1:310261849894:web:9085493a64ac736ce46be7",
  measurementId: "G-01C326ZGKK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);