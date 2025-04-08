// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAltYHaL8Y3BQa_B-cKdojfc7IJNOMHE1U",
  authDomain: "letsride-99ba2.firebaseapp",
  projectId: "letsride-99ba2",
  storageBucket: "letsride-99ba2.firebasestorage.app",
  messagingSenderId: "725781287581",
  appId: "1:725781287581:web:86ae1f345080e638783a74",
  measurementId: "G-X7VQ5EY4BX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };