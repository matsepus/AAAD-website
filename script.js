// Import Firebase modules directly from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

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



const albumParent = document.getElementById('albumCont'); 

const alnI = document.getElementById('albumNameInput');
const artnI =document.getElementById('artistNameInput');
const coverI = document.getElementById('coverURLInput');
const revI = document.getElementById('reviewInput');
const linkI = document.getElementById('linkInput');

const inbtn = document.getElementById('inputBtn');
if (inbtn) {
  inbtn.addEventListener("click", async () => {
    console.log("Button clicked");
    await sendInput();
  });
} else {
  console.error("Button not found!");
}

const reviews = document.querySelectorAll(".reviewText");
let currentOpen = null;

reviews.forEach(review => {
  review.addEventListener("click", () => {
    // Close currently open box if it’s not this one
    if (currentOpen && currentOpen !== review) {
      currentOpen.classList.remove("expanded");
    }

    // Toggle clicked box
    const isOpen = review.classList.toggle("expanded");
    currentOpen = isOpen ? review : null;
  });
});


async function sendInput() {
  console.log("Sending input to Firestore...");
  try {
    const docRef = await addDoc(collection(db, "albumCards"), {
      albumName: alnI.value,
      artistName: artnI.value,
      coverURL: coverI.value,
      review: revI.value,
      link: linkI.value,
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  }
  catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function fetchAlbumCards() {
  try {
    const querySnapshot = await getDocs(collection(db, "albumCards"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      //createAlbumCard(data);
      console.log(data);
    });
  }
    catch (e) {
    console.error("Error fetching documents: ", e);
  }
}

fetchAlbumCards();