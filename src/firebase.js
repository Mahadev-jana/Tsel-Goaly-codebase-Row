import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA-1Jx06uIyOkSxNIZrNr219iTdFNWd854",
  authDomain: "notification-8d7ad.firebaseapp.com",
  projectId: "notification-8d7ad",
  storageBucket: "notification-8d7ad.appspot.com",
  messagingSenderId: "947256444980",
  appId: "1:947256444980:web:e1992229c5300d77cae261"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);