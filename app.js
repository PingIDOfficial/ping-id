console.log("PingIDX App.js JALAN");

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, set, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// ====== CONFIG FIREBASE ======
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxx",
  authDomain: "pingidx-76020038.firebaseapp.com",
  databaseURL: "https://pingidx-76020038-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pingidx-76020038",
  storageBucket: "pingidx-76020038.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// References
const chatRef = ref(db, "chat");
const usersRef = ref(db, "users");

// ID user anonim
const userID = "PingIDX#" + Math.floor(Math.random() * 9000 + 1000);

// Radar container
const radar = document.querySelector(".radar");
let radarDots = [];
const nearbyCount = document.getElementById("nearbyCount");
const chatBox = document.getElementById("chatBox");

// ====== USER POSITION SIMULASI GPS ======
function updateUserPosition() {
  // Simulasi posisi acak di radar
  const angle = Math.random() * 2 * Math.PI;
  const radius = Math.random() * 90 + 20; 
  const x = 50 + radius * Math.cos(angle) / 1.1;
  const y = 50 + radius * Math.sin(angle) / 1.1;

  set(ref(db, `users/${userID}`), { x, y, lastActive: Date.now() });
}
setInterval(updateUserPosition, 3000); // tiap 3 detik

// ====== RENDER RADAR ======
onValue(usersRef, (snapshot) => {
  radarDots.forEach(dot => radar.removeChild(dot));
  radarDots = [];
  let count = 0;

  snapshot.forEach(userSnap => {
    const data = userSnap.val();
    if (userSnap.key === userID) return;

    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.style.left = `${data.x}%`;
    dot.style.top = `${data.y}%`;

    radar.appendChild(dot);
    radarDots.push(dot);
    count++;
  });

  nearbyCount.textContent = `📍 ${count} orang ≤ 200 meter`;
  chatBox.classList.toggle("hidden", count === 0);
});

// ====== CHAT ======
window.sendMessage = function () {
  const input = document.getElementById("msgInput");
  if (!input.value.trim()) return;

  push(chatRef, { user: userID, msg: input.value, time: Date.now() });
  input.value = "";
};

onChildAdded(chatRef, (snap) => {
  const data = snap.val();
  const msgBox = document.getElementById("messages");

  const div = document.createElement("div");
  div.textContent = `${data.user}: ${data.msg}`;
  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
});
