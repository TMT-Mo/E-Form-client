// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVEYnBdsr0hPI54CUtok7RK9CLpoPpDq8",
  authDomain: "e-form-system.firebaseapp.com",
  projectId: "e-form-system",
  storageBucket: "e-form-system.appspot.com",
  messagingSenderId: "905476038617",
  appId: "1:905476038617:web:f91646ea0b2844f9be83c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;