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

// Function to write to Firestore
async function testFirestore() {
  try {
    const docRef = await addDoc(collection(db, "test_collection"), {
      message: "Hello from my website!",
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Call the function to test writing
testFirestore();

const albumParent = document.getElementById('albumCont'); 

const btn = document.getElementById('addItemBtn');
const titleInput = document.getElementById('titleInput');
const reviewInput = document.getElementById('reviewInput');
const imgInput = document.getElementById('imgInput');
const linkInput = document.getElementById('linkInput');

const reviews = document.querySelectorAll('.reviewText'); 

reviews.forEach(review => {
  review.addEventListener('click', () => {
    review.classList.toggle('expanded');
  });
});

btn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const review = reviewInput.value.trim();
  const imgUrl = imgInput.value.trim();

  if (!title || !review || !imgUrl) return; // nothing entered

  // create the element
  const itemDiv = document.createElement('div');
  itemDiv.className = 'albumBox';

    const linkUrl = linkInput.value.trim();
    const a = document.createElement('a');
    a.href =linkUrl;
    a.target = '_blank';
    itemDiv.appendChild(a);
    
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = title;
    a.appendChild(img);
  


    const h3 = document.createElement('h3');
    h3.textContent = title;
    itemDiv.appendChild(h3);


    const p = document.createElement('p');
    p.textContent = review;
    itemDiv.appendChild(p);

  albumParent.appendChild(itemDiv);

  // clear inputs
  titleInput.value = '';
  reviewInput.value = '';
  imgInput.value = '';
});