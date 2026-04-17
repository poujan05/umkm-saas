import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9Fk6aptUklOTtsWnfbSv6XQ4WE1JbBaU",
  authDomain: "database-umkm-b98fd.firebaseapp.com",
  projectId: "database-umkm-b98fd",
  storageBucket: "database-umkm-b98fd.firebasestorage.app",
  messagingSenderId: "968371903247",
  appId: "1:968371903247:web:704750b2ca78f316b07c7a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);