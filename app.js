function sendPing() {
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }

  const statusText = document.getElementById("status");
  statusText.innerText = "📡 Ping terkirim! Menunggu balasan...";

  setTimeout(() => {
    statusText.innerText = "👋 Seseorang di sekitar merespons!";
  }, 2000);
}
