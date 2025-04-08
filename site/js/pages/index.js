// Console Easter Egg
console.log("%cYou’re not supposed to be here...", "color: red; font-size: 16px;");
console.log("Try searching every corner of this site");
console.log("you'll get in");

let hexcode = "64 65 67 65 6e 65 72 61 63 79";
let correctCode = 'degeneracy';

// Simulate hidden fetch (fake trail)
fetch("./logs/initiate.json")
  .then(res => res.json())
  .then(data => console.log("Status:", data.status, "| Clue:", data.clue))
  .catch(() => console.log("Log access denied."));



function submitCode() {
  const code = document.getElementById('codeInput').value.trim().toLowerCase();

  if (code === correctCode ) {
    sessionStorage.setItem("auth_granted", "true");
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

document.getElementById("click-zone").addEventListener("dblclick", () => {
  const hex = hexcode; // "memeghost"
  const zone = document.getElementById("click-zone");
  zone.textContent = hex;
});

const zone = document.getElementById("click-zone");
let lastTap = 0;

zone.addEventListener("click", () => {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTap;

  if (tapLength < 300 && tapLength > 0) {
    const hex = hexcode; // "memeghost"
    zone.textContent = hex;
  }

  lastTap = currentTime;
});

