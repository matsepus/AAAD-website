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
const backCover = document.getElementById("backCover");
const loginPopup = document.getElementById("loginPopup");
const authUsername = document.getElementById("authUsername");
const authPass = document.getElementById("authPass");

let currentUserCred = null;

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", async () => {
  await login();
});

authPass.addEventListener("keydown",  async (e) => {
  if (e.key === "Enter"){
  await login();
  }
});

const createAccBtn = document.getElementById("createAccBtn");
createAccBtn.addEventListener("click", async () => {
  await createAccount();
});

function toggleLoginPopup(displayStyle) {
  loginPopup.style.display = displayStyle;
  backCover.style.display = displayStyle;
}


async function login() {
  const email = `${authUsername.value}@prump.com`;
  const password = authPass.value;
  try {
    currentUserCred = await signInWithEmailAndPassword(auth, email, password);

    console.log("Login .-OK motherfucker");
    toggleLoginPopup("none");
  } catch (e) {
    alert("Login error: " + e.message);
  }
}

async function createAccount() {
  const email = `${authUsername.value}@prump.com`;
  const password = authPass.value;
  try {
    currentUserCred = await createUserWithEmailAndPassword(auth, email, password);

    console.log("Account created .-OK ^^");
    toggleLoginPopup("none");
  } catch (e) {
    alert("Create error: " + e.message);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in:", user.email);
    currentUserCred = { user };
    toggleLoginPopup("none");
    fetchAlbumCards();
    let headerText = user.email + "'s Logr";
    headerText = headerText.replace("@prump.com", "");
    mainPageHeader.innerHTML = headerText;
  } else {
    toggleLoginPopup("flex");
    console.log("No user logged in");
  }
});

const mainPageHeader = document.getElementById("mainPageHeader");

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

const addEntryOverlay = document.getElementById("addEntryOverlay");
const addEntry = document.getElementById("addEntry");
const closeAddEntry = document.getElementById("closeAddEntryBtn");

addEntry.addEventListener("click", () => {
  console.log("Opening popup");
  addEntryOverlay.style.display = "flex";
  sideMenu.classList.toggle("expanded");
});
closeAddEntry.addEventListener("click", () => {
  console.log("Opening popup");
  addEntryOverlay.style.display = "none";
  sideMenu.classList.toggle("expanded");
});

var slider = document.getElementById("ratingSlider");
var ratingValue = document.getElementById("ratingValue");
ratingValue.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  ratingValue.innerHTML = this.value;
}

async function sendInput() {
  addEntryOverlay.style.display = "none";
  console.log("Sending input to Firestore...");
  try {
    const docRef = await addDoc(collection(db, currentUserCred.user.email + " - albumCards"), {
      albumName: alnI.value,
      artistName: artnI.value,
      rating: ratingValue.innerHTML,
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
  if (!currentUserCred || !currentUserCred.user) {
    console.log("User not ready yet");
    return;
  }

  try {
    const q = query(
      collection(db, currentUserCred.user.email + " - albumCards"),
      orderBy("timestamp", "desc") // nyeste først
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      makeAlbumCards(doc.data());
    });
  } catch (e) {
    console.error("Error fetching documents: ", e);
  }
}

function makeAlbumCards(data) {
  const albumParent = document.getElementById('albumCont'); 

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