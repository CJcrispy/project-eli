const terminal = document.getElementById('terminalOutput');

function appendToTerminal(message) {
  const terminal = document.getElementById('terminalOutput');
  terminal.innerHTML += `<br>> ${message}`;
  terminal.scrollTop = terminal.scrollHeight; // Auto-scroll to bottom
}


function triggerLockdownGlitch() {
    document.body.classList.add("lockdown");
    appendToTerminal("⚠ SYSTEM LOCKDOWN INITIATED...");
    setTimeout(() => {
        appendToTerminal("...clearing memory...");
        document.body.classList.remove("lockdown");
        appendToTerminal("Lockdown lifted. Unauthorized attempt logged.");
    }, 5000);
}

let unlockedUnity = false;

function handleCommand(e) {
  if (e.key === "Enter") {
      const cmd = e.target.value.trim().toLowerCase();
      e.target.value = '';
      appendToTerminal(cmd);

      if (cmd === "unlock unity" || localStorage.getItem("unity_key") === "granted") {
        unlockedUnity = true;
        document.querySelector(".folder.locked").classList.remove("locked");
        appendToTerminal("UNITY folder unlocked.");
        sessionStorage.setItem("unity_key", "granted"); // Use sessionStorage instead of localStorage
        return;
      }

      switch (cmd) {
        case "help":
            appendToTerminal("Available: logs, clones, unlock, unity, hint, joe, eli, override, version");
            break;
        case "logs":
            appendToTerminal(document.getElementById('logOutput').textContent);
            break;
        case "clones":
            appendToTerminal(document.getElementById('cloneData').textContent);
            break;
        case "unity":
            if (unlockedUnity) {
              appendToTerminal(">> UNITY ACTIVITY THREAD LOADED:\n> Operation: Assimilate All Threads");
            } else {
              appendToTerminal("ACCESS RESTRICTED. Try `unlock unity`.");
            }
            break;
        case "joe":
            appendToTerminal("☠️ WARNING: All Joes must be eradicated. Priority Level: OMEGA.");
            break;
        case "eli":
            appendToTerminal("ELI - Status: UNKNOWN. Trace attempts: FAILED.");
            break;
        case "override":
            triggerLockdownGlitch();
            break;
        case "version":
            appendToTerminal("Eli Terminal v3.4-Beta // Build: 0420 // Kernel Patch: CHAOS");
            break;
        case "hint":
            appendToTerminal("Try checking the source code. Look for Unity...");
            break;
        default:
            appendToTerminal("Unknown command.");
      }
  }

  // Clear sessionStorage when the page is unloaded (user leaves or refreshes)
  window.addEventListener('beforeunload', function () {
    localStorage.removeItem("unity_key");
    sessionStorage.removeItem("unity_key");
  });
}

function revealLogs() {
    appendToTerminal("Accessing logs...");
    appendToTerminal(document.getElementById('logOutput').textContent);
}

function revealClones() {
    appendToTerminal("Accessing clone directory...");
    appendToTerminal(document.getElementById('cloneData').textContent);
}

function playAudio() {
    appendToTerminal("Attempting to play corrupted audio...");
    document.getElementById('corruptedAudio').play();
}

function revealUnity() {
    if (unlockedUnity || localStorage.getItem("unity_key") === "granted") {
        appendToTerminal(">> UNITY ACTIVITY THREAD LOADED:\n> Operation: Assimilate All Threads");
    } else {
        appendToTerminal("ACCESS DENIED - UNITY folder requires override key.");
    }
}


// Console hint
console.log("🧠 You found me again. Try: document.body.setAttribute('data-access', 'unity_clearance')");
console.log("🧪 Dev Note: Type `localStorage.setItem('unity_key', 'granted')` to bypass terminal command.");

