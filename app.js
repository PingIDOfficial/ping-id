console.log("APP.JS JALAN - Ping.IDX Modern");

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, set, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "API_KEY_FIREBASE",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "YOUR_PROJECT_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "chat");
const usersRef = ref(db, "users");

// User anonymous ID
const myID = "Ping#" + Math.floor(Math.random() * 9000 + 1000);

const radar = document.querySelector(".radar");
let radarDots = [];
const nearbyCount = document.getElementById("nearbyCount");
const chatBox = document.getElementById("chatBox");

// =========================
// GPS SIMULASI / REAL
// =========================
function updateUserLocation() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    set(ref(db, `users/${myID}`), {
      lat, lon,
      lastActive: Date.now()
    });
  });
}
setInterval(updateUserLocation, 3000); // update tiap 3 detik

// =========================
// RADAR & USER DETECTION
// =========================
onValue(usersRef, snap => {
  radarDots.forEach(dot => radar.removeChild(dot));
  radarDots = [];

  let count = 0;
  snap.forEach(userSnap => {
    const u = userSnap.val();
    if (userSnap.key === myID) return;

    // Jarak sederhana simulasi (hanya demo)
    const distance = Math.random() * 200; // nantinya bisa hitung dari GPS real
    if (distance <= 200) {
      const angle = Math.random() * Math.PI * 2;
      const radius = distance / 2; 
      const x = 130 + Math.cos(angle) * radius;
      const y = 130 + Math.sin(angle) * radius;

      const dot = document.createElement("div");
      dot.className = "dot";
      dot.style.left = x + "px";
      dot.style.top = y + "px";

      radar.appendChild(dot);
      radarDots.push(dot);

      count++;
    }
  });

  nearbyCount.textContent = `📍 ${count} orang ≤ 200 meter`;
  chatBox.classList.toggle("hidden", count === 0);
});

// =========================
// CHAT
// =========================
window.sendMessage = function () {
  const input = document.getElementById("msgInput");
  if (!input.value.trim()) return;

  push(chatRef, {
    user: myID,
    msg: input.value,
    time: Date.now()
  });

  input.value = "";
};

onChildAdded(chatRef, snap => {
  const data = snap.val();
  const msgBox = document.getElementById("messages");

  const div = document.createElement("div");
  div.textContent = `${data.user}: ${data.msg}`;
  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
});
