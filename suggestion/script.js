// Import Firebase modules directly from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDwOaA0vuBYfXdWDNF5q3PuiDtzspsEl9U",
  authDomain: "aaad-icu.firebaseapp.com",
  projectId: "aaad-icu",
  storageBucket: "aaad-icu.firebasestorage.app",
  messagingSenderId: "312568177333",
  appId: "1:312568177333:web:2f4e0ce9214361fafc54fc",
  measurementId: "G-XPQXN1DCN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore instance

const inbtn = document.getElementById('submitSuggestion');
if (inbtn) {
  inbtn.addEventListener("click", async () => {
    console.log("Button clicked");
    await sendSuggestion();
  });
} else {
  console.error("Button not found!");
}

async function sendSuggestion() {
    const iSuggAlN = document.getElementById('iSuggAlN');
    const iSuggArN = document.getElementById('iSuggArN');
    const iSuggAlL = document.getElementById('iSuggAlL');

    try {
        const docRef = await addDoc(collection(db, "suggestionCollection"), {
            albumName: iSuggAlN.value,
            artistName: iSuggArN.value,
            albumLink: iSuggAlL.value,
            timestamp: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
        iSuggAlL.value = '';
        iSuggArN.value = '';
        iSuggAlN.value = '';
      }
      catch (e) {
        console.error("Error adding document: ", e);
      }
}