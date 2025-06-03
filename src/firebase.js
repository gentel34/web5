import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Ініціалізація Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBOfas7D219Degy-OE5NfSQsD3Dq6wsU5Y",
  authDomain: "history-web-675dc.firebaseapp.com",
  projectId: "history-web-675dc",
  storageBucket: "history-web-675dc.firebasestorage.app",
  messagingSenderId: "907708970633",
  appId: "1:907708970633:web:76e3c4c0a22f7ec38ef858",
  measurementId: "G-72FXL121KH"
};

const app = initializeApp(firebaseConfig);

// Firebase сервіси
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Експорти
export { auth, db, provider };
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const resetPassword = (email) => sendPasswordResetEmail(auth, email);
