// Console Easter Egg
console.log("%cYou’re not supposed to be here...", "color: red; font-size: 16px;");
console.log("Try typing: clearanceCode = 'loudboi'; then refresh the page.");
console.log("OR look deeper into the network logs...");

// Simulate hidden fetch (fake trail)
fetch("./logs/initiate.json")
  .then(res => res.json())
  .then(data => console.log("Status:", data.status, "| Clue:", data.clue))
  .catch(() => console.log("Log access denied."));

// Global variable for dev tools use
let clearanceCode = "";

function submitCode() {
  const code = document.getElementById('codeInput').value.trim().toLowerCase();
  const correctCode = 'loudboi'; // Change this for your real game

  if (code === correctCode || clearanceCode === correctCode) {
    window.location.href = "pages/eli-office.html";
  } else {
    const status = document.getElementById('status');
    status.style.display = "block";
    status.textContent = "ACCESS DENIED";
    shakeTerminal();
  }
}

function shakeTerminal() {
  const term = document.getElementById('terminal');
  term.style.animation = "shake 0.5s";
  setTimeout(() => term.style.animation = "", 500);
}