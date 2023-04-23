import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyCzkwyrP3Y3LUcJt1bktng46fWsL9pZhhY",
    authDomain: "swaphastorage.firebaseapp.com",
    projectId: "swaphastorage",
    storageBucket: "swaphastorage.appspot.com",
    messagingSenderId: "76491953353",
    appId: "1:76491953353:web:af5e713ac28fa925602918"
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;