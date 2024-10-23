// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Optional: If you're using Firestore

const firebaseConfig = {
    apiKey: "AIzaSyB-ZvDblgzGyExZjRVXH6uzwFT5A42xr_A",
    authDomain: "to-do-list-app-b8205.firebaseapp.com",
    projectId: "to-do-list-app-b8205",
    storageBucket: "to-do-list-app-b8205.appspot.com",
    messagingSenderId: "83050637702",
    appId: "1:83050637702:web:aa356a742a12faa4622407",
    measurementId: "G-ZJW3T3S3GV"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app); // Ensure this line is correct

// Optional: Initialize Firestore if needed
const db = getFirestore(app);

// Export Firebase services
export { auth, db }; // Ensure you're exporting 'auth' and 'db'
