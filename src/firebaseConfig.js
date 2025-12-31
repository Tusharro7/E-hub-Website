import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRA-y2x7wZDZaKFcZ-QW2frLasVTt_c3M",
  authDomain: "e-hub-website.firebaseapp.com",
  projectId: "e-hub-website",
  storageBucket: "e-hub-website.firebasestorage.app",
  messagingSenderId: "919661999406",
  appId: "1:919661999406:web:6c9b288553b43c2808b6bf",
  measurementId: "G-GZRB4FMWPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();