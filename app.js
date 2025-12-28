const dots = document.querySelectorAll(".dot");
const chatBox = document.getElementById("chatBox");
const messages = document.getElementById("messages");
const statusText = document.getElementById("status");

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    chatBox.classList.remove("hidden");
    messages.innerHTML += `<div>👤 Orang anonim terhubung</div>`;
    statusText.innerText = "💬 Terhubung dengan orang di sekitar";
  });
});

function sendMessage() {
  const input = document.getElementById("msgInput");
  if (input.value.trim() === "") return;

  messages.innerHTML += `<div>🧑 Kamu: ${input.value}</div>`;
  input.value = "";

  setTimeout(() => {
    messages.innerHTML += `<div>👤 Anonim: halo 👀</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 1000);
}
