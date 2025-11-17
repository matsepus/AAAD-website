// Import Firebase modules directly from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

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

const email = "saghaugmats@gmail.com";
const password = "JegElskerMusikk123!";

async function signIn() {
  const auth = getAuth();
  try {
    console.log("Signing in...");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);}
    catch (error) {
    console.error("Error signing in: ", error);
  }
}

signIn();

const albumParent = document.getElementById('albumCont'); 

const alnI = document.getElementById('albumNameInput');
const artnI =document.getElementById('artistNameInput');
const coverI = document.getElementById('coverURLInput');
const revI = document.getElementById('reviewInput');
const linkI = document.getElementById('linkInput');

//Preview cover image functionality
const preview = document.getElementById('preview');
coverI.addEventListener('input', () => {
    preview.src = coverI.value;
    preview.style.visibility = 'visible';
});

// Auto-resize textarea
function autoSize(el){
    const fs = parseFloat(getComputedStyle(document.documentElement).fontSize);
    el.style.height = "auto";
    el.style.height = (el.scrollHeight / fs)+"rem";
}

// Handle input button click
const inbtn = document.getElementById('inputBtn');
if (inbtn) {
  inbtn.addEventListener("click", async () => {
    console.log("Button clicked");
    await sendInput();
  });
} else {
  console.error("Button not found!");
}

const popupOverlay = document.getElementById("addEntryOverlay");

async function sendInput() {
  popupOverlay.style.display = "none";
  console.log("Sending input to Firestore...");
  try {
    const docRef = await addDoc(collection(db, userCredential.email + "albumCards"), {
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
      makeAlbumCards(data);
    });
  }
    catch (e) {
    console.error("Error fetching documents: ", e);
  }
}

function makeAlbumCards(data) {
  const albumCard = document.createElement('div');
  albumCard.className = 'albumCard';

  const albumArt = document.createElement('img');
  albumArt.className = 'albumArt';
  albumArt.src = data.coverURL;

  const albumName = document.createElement('div');
  albumName.className = 'albumName';
  albumName.textContent = data.albumName;

  const artistName = document.createElement('div');
  artistName.className = 'artistName';
  artistName.textContent = data.artistName;

  const reviewText = document.createElement('div');
  reviewText.className = 'reviewText';
  reviewText.textContent = data.review;

  albumParent.appendChild(albumCard);
  albumCard.appendChild(albumArt);
  albumCard.appendChild(albumName);
  albumCard.appendChild(artistName);
  albumCard.appendChild(reviewText);

  location.reload
  addExpandReview();
}

fetchAlbumCards();


function addExpandReview() {
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
}

const hamburgerDiv = document.getElementById("hamburgerDiv");
const sideMenu = document.getElementById("sideMenu");


hamburgerDiv.addEventListener("click", () => {
  sideMenu.classList.toggle("expanded");
});

const addEntry = document.getElementById("addEntry");
const addEntryOverlay = document.getElementById("addEntryOverlay");

addEntry.addEventListener("click", () => {
  console.log("Opening popup");
  addEntryOverlay.style.display = "flex";
  sideMenu.classList.toggle("expanded");
});