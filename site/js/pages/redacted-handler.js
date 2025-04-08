// redacted-handler.js

function handleRedactedLog() {
    const terminal = document.getElementById("terminalOutput");
  
    if (!terminal) return;
  
    terminal.innerHTML += "<br>> [REDACTED] file is corrupted. Attempting recovery...<br>";
    terminal.innerHTML += "> Launching cipher terminal.<br><br>";
  
    // Option A: open the codebreaker in a new tab
    setTimeout(() => {
      window.location.href = "../pages/codebreaker.html";
    }, 1000);
  }
  
  // Check if the [REDACTED] file was solved previously
  window.addEventListener("load", () => {
    const unlocked = localStorage.getItem("unlockedRedacted");
    const terminal = document.getElementById("terminalOutput");
  
    if (unlocked === "true" && terminal) {
      terminal.innerHTML += "<br>> [REDACTED] decryption successful. Hidden plans unlocked.<br>";
      const hiddenPlansFolder = document.getElementById("folderHiddenPlans");
      if (hiddenPlansFolder) hiddenPlansFolder.classList.remove("hidden");
    }
  });
  