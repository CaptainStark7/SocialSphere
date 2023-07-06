import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdOVGTQr6AKl1kDPIsme0jhZ0o09LHtuY",
  authDomain: "universe-25671.firebaseapp.com",
  projectId: "universe-25671",
  storageBucket: "universe-25671.appspot.com",
  messagingSenderId: "151022863993",
  appId: "1:151022863993:web:defd5fc40d582f91c6f6a8",
  measurementId: "G-66ES650DMM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
