let nearbyUsers = 0;

function detectNearbyUsers() {
  const count = Math.floor(Math.random() * 5) + 1;
  nearbyUsers = count;

  document.getElementById("nearbyCount").innerText =
    `👥 ${count} orang aktif di sekitar kamu`;
}

function sendPing() {
  if (navigator.vibrate) navigator.vibrate(200);

  document.getElementById("status").innerText =
    "📡 Ping dikirim ke sekitar...";

  setTimeout(() => {
    document.getElementById("status").innerText =
      "👋 Ada yang sadar dengan ping kamu!";
  }, 2000);
}

detectNearbyUsers();
