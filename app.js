console.log("APP.JS JALAN");

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCnmYG0cZsv52GmMRxjPPuWmIyNpr4xww",
  authDomain: "ping-id-chat.firebaseapp.com",
  databaseURL: "https://ping-id-chat-578b6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ping-id-chat",
  storageBucket: "ping-id-chat.appspot.com",
  messagingSenderId: "1034233458438",
  appId: "1:1034233458438:web:0c14b3dd9765cdb8a73887"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "chat");

// Generate anonymous ID
const userID = "Ping#" + Math.floor(Math.random() * 9000 + 1000);

// Array untuk menyimpan titik orang
let radarDots = [];

// Fungsi PING → detect orang
window.sendPing = function () {
  const status = document.getElementById("status");
  const chatBox = document.getElementById("chatBox");
  const radar = document.querySelector(".radar");

  // Simulasi deteksi 1-5 orang
  const detectedCount = Math.floor(Math.random() * 5) + 1;

  // Clear sebelumnya
  radarDots.forEach(dot => radar.removeChild(dot));
  radarDots = [];

  if (detectedCount > 0) {
    status.innerText = `📡 ${detectedCount} orang terdeteksi!`;
    chatBox.classList.remove("hidden");
    radar.classList.add("detected");

    for (let i = 0; i < detectedCount; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");

      // Posisi random dalam radar (circle radius)
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 90 + 20; // jarak 20–110px dari center
      const x = 50 + radius * Math.cos(angle) / 1.1; // persentase
      const y = 50 + radius * Math.sin(angle) / 1.1; // persentase

      dot.style.left = `${x}%`;
      dot.style.top = `${y}%`;

      radar.appendChild(dot);
      radarDots.push(dot);
    }
  } else {
    status.innerText = "❌ Tidak ada orang di sekitar";
    chatBox.classList.add("hidden");
    radar.classList.remove("detected");
  }
};

// Kirim pesan
window.sendMessage = function () {
  const input = document.getElementById("msgInput");
  if (!input.value.trim()) return;

  push(chatRef, {
    msg: input.value,
    user: userID,
    time: Date.now()
  });

  input.value = "";
};

// Terima pesan realtime
onChildAdded(chatRef, (snapshot) => {
  const chatBox = document.getElementById("chatBox");
  chatBox.classList.remove("hidden");

  const messages = document.getElementById("messages");
  const data = snapshot.val();

  const div = document.createElement("div");
  div.textContent = `${data.user}: ${data.msg}`;
  messages.appendChild(div);
});
