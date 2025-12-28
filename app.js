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

// Fungsi PING → radar detect
window.sendPing = function () {
  const status = document.getElementById("status");
  const chatBox = document.getElementById("chatBox");
  
  // Simulasi deteksi orang 10–20 meter
  const detected = Math.random() > 0.3; // 70% chance ada orang
  if (detected) {
    status.innerText = `📡 Orang terdeteksi di 10–20m!`;
    chatBox.classList.remove("hidden");
    console.log("Orang terdeteksi, chat aktif");
  } else {
    status.innerText = "❌ Tidak ada orang di sekitar";
    chatBox.classList.add("hidden");
    console.log("Tidak ada orang");
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
