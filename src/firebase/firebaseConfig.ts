import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuB74wSx6ljT3MDOxaXFJ50WnmUrHQtvk",
  authDomain: "shopping-cart-fa8cb.firebaseapp.com",
  projectId: "shopping-cart-fa8cb",
  storageBucket: "shopping-cart-fa8cb.firebasestorage.app",
  messagingSenderId: "1058910091331",
  appId: "1:1058910091331:web:f60a8efd19c3d118557cf6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

const storage = getStorage(app);
const database = getDatabase(app);

const auth = getAuth(app);

export { auth, fireDB, storage, database };
