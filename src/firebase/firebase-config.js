import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJ1oR40lVCThm4oaWlU4b9q_rikG_gHAI",
  authDomain: "monkey-blogging-f7436.firebaseapp.com",
  projectId: "monkey-blogging-f7436",
  storageBucket: "monkey-blogging-f7436.appspot.com",
  messagingSenderId: "990943886258",
  appId: "1:990943886258:web:a651e6067c8e8cc8b942ab",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
