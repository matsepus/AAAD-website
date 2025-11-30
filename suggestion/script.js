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
const auth = getAuth();

let currentUserCred = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserCred = { user };
        console.log("Logged in:", user.email, "motherfucker ^_^");
    } else {
        window.open("https://www.aaad.icu", "_self")
    }
});

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
    if (!currentUserCred) {
        alert("Not logged in motherfucker ^w^");
        return;
    }

    await addDoc(collection(db, "suggestionCollection"), {
        albumName: iSuggAlN.value,
        artistName: iSuggArN.value,
        albumLink: iSuggAlL.value,
        suggestionOwner: currentUserCred.user.email,
        timestamp: new Date()
    });
}

async function fetchSuggestionCards() {
    try {
    const querySnapshot = await getDocs(collection(db, "suggestionCollection"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        makeSuggestionCard(data);
        });
    }
    catch (e) {
        console.error("Error fetching documents: ", e);
    }
}

const suggestionContainer = document.getElementById('suggestionCont');

function makeSuggestionCard(data) {
    console.log("Creating suggestion card for:", data);
    const card = document.createElement('div');
    card.className = 'suggestionCard';
    const albumImage = document.createElement('img');
    albumImage.className = 'suggestionArt';
    albumImage.src = data.albumLink;
    const cover = document.createElement('div');
    cover.className = 'suggestionCover';
    const albumName = document.createElement('div');
    albumName.className = 'suggestionTitle';
    albumName.textContent = data.albumName;
    const artistName = document.createElement('div');
    artistName.className = 'suggestionArtist';
    artistName.textContent = data.artistName;
    const suggestionOwner = document.createElement('div');
    suggestionOwner.className = 'suggestionOwner';
    let suffix = "@prump.com"
    let value = data.suggestionOwner;
    value = String(value).replace(suffix, "");
    suggestionOwner.textContent = `Suggested by: ${value}`;

    suggestionContainer.appendChild(card);
    card.appendChild(cover);
    card.appendChild(albumImage);
    cover.appendChild(albumName);
    cover.appendChild(artistName);
    cover.appendChild(suggestionOwner);
}

fetchSuggestionCards();