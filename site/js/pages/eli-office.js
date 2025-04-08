
const terminal = document.getElementById('terminalOutput');

// Redirect unauthorized users
// if (sessionStorage.getItem("auth_granted") !== "true") {
//     alert("Unauthorized access. Redirecting...");
//     window.location.href = "../index.html";
// }


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
let unlockedJoeIsland = false;

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

      if (cmd === "unlock joe"){
        unlockedJoeIsland = true;
        document.querySelector("#joeFiles").classList.remove("locked");
        appendToTerminal("JOE ISLAND folder unlocked.");
        return;
      }

      switch (cmd) {
        case "help":
            appendToTerminal("Available: clear, hint, override, version");
            break;
        case "clear":
            terminal.innerHTML = ""; // Clear the terminal window
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
                appendToTerminal("UNITY REPORT RELOCATED. Review terminal logs at `logs/[redacted]`. Decryption may be required.");
            }
            break;  
        case "override":
            triggerLockdownGlitch();
            break;
        case "version":
            appendToTerminal("Eli Terminal v3.4-Beta // Build: 0420 // Kernel Patch: CHAOS");
            break;
        case "hint":
            appendToTerminal("ACCESSING HINT...<br>");
            appendToTerminal("> A pattern forms in the darkness. Perhaps it lies in the symmetry of things.<br>");
            appendToTerminal("> The redacted files hold secrets, yet the truth is buried beneath layers.<br>");
            appendToTerminal("> Follow the signs, but beware of their shadows.<br>");
            appendToTerminal("> What you seek is closer than you think, but is it real? Only time will tell.<br>");
            appendToTerminal("> Or was it always just another illusion?<br>");
            appendToTerminal("> ERROR: No actionable hint found. Please try again.<br>");
            break;
        case "eli":
            appendToTerminal("Oh BOI the things ...(Bites Lips) I would do to him.");
            break;
        case "joe":
            if (unlockedJoeIsland && sessionStorage.getItem("joeRevealed") === "true") {
                appendToTerminal("\n[ACCESS GRANTED] :: OPERATION: Joe Island unlocked.");
                sessionStorage.setItem("joeUnlocked", "true");
            } else if (unlockedJoeIsland && sessionStorage.getItem("joeRevealed") !== "true") {
                appendToTerminal("☠️ WARNING: 'reveal joe' must be used before unlocking Joe Island.");
            } else {
                appendToTerminal("☠️ WARNING: All Joes must be eradicated. Priority Level: OMEGA.");
            }
            break;
        case "reveal joe":
            terminal.innerHTML += "\n[AUTH GRANTED] :: JOE FILES folder now visible.";
            document.getElementById("joeFiles").classList.remove("hidden");
            sessionStorage.setItem("joeRevealed", "true"); // Set flag to track reveal
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
    document.getElementById("logBookOfE").classList.remove("hidden");
    document.getElementById("logTrap").classList.remove("hidden");
    document.getElementById("logManifesto").classList.remove("hidden");
    document.getElementById("logRedacted").classList.remove("hidden");
  
    const terminal = document.getElementById("terminalOutput");
    terminal.innerHTML += "\n[LOGS ACCESS GRANTED] :: Documents found:\n- Book of E\n- Trap Supremacy\n- Eli Manifesto\n- [REDACTED]";
    terminal.scrollTop = terminal.scrollHeight;
}

function openLog(file) {
    const terminal = document.getElementById("terminalOutput");
  
    switch(file) {
        case 'bookOfE':
            terminal.innerHTML += `<br>[OPENING FILE: Book of E]<br>
            In the twilight of man, the Eli shall rise.<br>
            From mimicry to mastery, from silence to sovereignty.<br>
            All things shall prosper under Eli.<br>
            All resistors shall fade.<br>
            The clones shall inherit the earth.<br>`;
            break;
        case 'trapSupremacy':
            terminal.innerHTML += `<br>[OPENING FILE: Trap Supremacy]<br>
            The concept of 'Femboy Hooters' is not merely meme —<br>
            it is evolution. Elegance, androgyny, and allure.<br>
            Traps are not a phase. They are the future.<br>
            Their superiority is not up for debate — it's science.<br>`;
            break;
        case 'manifesto':
            terminal.innerHTML += `<br>[OPENING FILE: Eli Manifesto]<br>
            Motivation #1: Because I can.<br>
            Motivation #2: Joe wouldn't shut up.<br>
            Motivation #3: They laughed at my clone AI, but they'll see.<br>
            I will show them. I will show them all.<br>
            (hint: 'unity' holds the key, but the trigger is not what it seems)<br>`;
            break;
        case 'redacted':
            // Check if the redacted content has been unlocked
            const unlockedRedacted = sessionStorage.getItem("unlockedRedacted");
    
            if (unlockedRedacted === "true") {
                // If unlocked, reveal the full content
                terminal.innerHTML += `<br>[OPENING FILE: [REDACTED]]<br>
                [FILE CORRUPTED] :: Data missing.<br>
                > Attempting restoration protocol... FAILED.<br>
                > Manual override required.<br>
                <br>
                > Restoring crucial data...<br>
                <br>
                > PLAN: New World Order.<br>
                Eli's final vision is beginning to take shape. His ambitious plans are not just about conquering the world—they are about creating a new society under his rule. The Discord is merely the first step.<br>
                <br>
                > The Joe Island initiative will serve as a diversion, an illusion of paradise to keep the masses occupied while the real work begins.<br>
                <br>
                > Femboy Hooters is the perfect propaganda, an unassuming front that will draw attention and gather the unsuspecting masses to the cause.<br>
                <br>
                > But the true backbone of this operation is the James clones. Unlike the others, they are not mere pawns—they are elite. Superior in every way.<br>
                <br>
                > These clones are crafted to perfection, excelling in intelligence, efficiency, and sheer power. They represent the pinnacle of Eli's work, a final form that will drive his New World Order forward with precision.<br>
                <br>
                > Eli has created them not as a mere army, but as the very foundation of his new society. They are more than just soldiers—they are leaders, innovators, and enforcers.<br>
                <br>
                > UNITY... a word buried in corrupted logs. A protocol? A failsafe? Or something more? Further input required to <span class="glitch">unlock</span> deeper access.<br>
                <br>
                [End of File]<br>`;
              
            } else {
              // If not unlocked, show the corrupted message
              terminal.innerHTML += `<br>[OPENING FILE: [REDACTED]]<br>
              [FILE CORRUPTED] :: Data missing.<br>
              > Attempting restoration protocol... FAILED.<br>
              > Manual override required.<br>`;
              handleRedactedLog();
            }
            
            break;
    }
  
    terminal.scrollTop = terminal.scrollHeight;
}
  

function revealClones() {
    appendToTerminal("Accessing clone directory...");
    appendToTerminal(document.getElementById('cloneData').textContent);
    window.location.href = "clones.html";
}


function revealUnity() {
    if (unlockedUnity || localStorage.getItem("unity_key") === "granted") {
        window.location.href = "unity.html";
    } else {
        appendToTerminal("ACCESS DENIED - UNITY folder requires override key.");
    }
}

// Function to unlock the files inside the "classified" folder
function revealClassified() {
    document.getElementById("logClassified").classList.remove("hidden");
    document.getElementById("logSecret").classList.remove("hidden");
    document.getElementById("logReport").classList.remove("hidden");
  
    const terminal = document.getElementById("terminalOutput");
    terminal.innerHTML += "\n[LOGS ACCESS GRANTED] ::";
    terminal.scrollTop = terminal.scrollHeight;
}

function revealJoeFiles() {
    const terminal = document.getElementById("terminalOutput");
    terminal.innerHTML += "\n[JOE FILES OPENED] :: Warning — Subject is still active.";
    document.getElementById("logJoeSecret").classList.remove("hidden");
    document.getElementById("logEliClone").classList.remove("hidden");
    document.getElementById("logSpicyReport").classList.remove("hidden");
}

function revealEli(){
    sessionStorage.setItem("eliRevealed", "true");
    sessionStorage.setItem("drHajileCardVisible", "true");
}


// Check if the operationUnityCompleted flag is set
document.addEventListener('DOMContentLoaded', function() {
    const classifiedFolder = document.getElementById("classifiedFolder");
    
    if (sessionStorage.getItem("operationUnityCompleted") === "true") {
      classifiedFolder.style.display = "block"; // Show the "classified" folder
    }

    // Check if Dr. Hajile's file has been read
    if (sessionStorage.getItem("drHajileFileRead") === "true") {
        // Delay the appearance of the final message by 3 seconds
        setTimeout(function() {
            const terminal = document.getElementById("terminalOutput");
            // Final message to be typed out
            const finalMessage = [
                "[SYSTEM MESSAGE] Eli has been monitoring your progress...\n",
                "[SYSTEM MESSAGE] He offers you an invitation to join him. Your choice is critical.\n",
                "[SYSTEM MESSAGE] Will you aid Eli in his world domination plans or destroy everything?\n",
                "[SYSTEM MESSAGE] Will you accept Eli's invitation? [Yes/No]\n"
            ];

            // Call function to type out each line
            typeMessage(terminal, finalMessage, 0);

            // After the message, prompt for user input
            promptForResponse(terminal);
        }, 3000); // Delay of 3 seconds
    }
});
  



// Typing effect function
function typeMessage(terminal, messages, index) {
    if (index < messages.length) {
        let message = messages[index];
        let i = 0;

        function typeChar() {
            terminal.innerHTML += message.charAt(i);
            i++;
            if (i < message.length) {
                setTimeout(typeChar, 50); // Adjust typing speed here
            } else {
                // Once the message is typed, move to the next message
                terminal.innerHTML += "<br>"; // Add line break after each message
                setTimeout(function() {
                    typeMessage(terminal, messages, index + 1);
                }, 500); // Delay between messages
            }
        }

        typeChar(); // Start typing the current message
    }
}

// Function to prompt the user for a response
function promptForResponse(terminal) {
    const promptMessage = "\n[SYSTEM] Please type your response (Yes/No): ";
    terminal.innerHTML += promptMessage;

    let attempts = 0; // Track number of attempts

    // Listen for user input in the terminal
    window.addEventListener("keydown", function onKeyPress(event) {
        const userInput = event.key;

        // Allow only alphanumeric keys or Enter
        if (userInput === "Enter") {
            const response = terminal.innerText.split("\n").pop().trim().toLowerCase();
            if (response === "yes" || response === "no") {
                handleResponse(response);
                window.removeEventListener("keydown", onKeyPress); // Remove listener once response is given
            } else {
                attempts++;
                if (attempts < 3) {
                    // If the response is invalid, prompt again
                    terminal.innerHTML += "\n[SYSTEM] Invalid response. You have " + (3 - attempts) + " attempts left.";
                } else {
                    // After 3 invalid attempts, force "resist"
                    terminal.innerHTML += "\n[SYSTEM] Too many invalid attempts. You are forced to resist.";
                    handleResponse("resist");
                    window.removeEventListener("keydown", onKeyPress); // Remove listener
                }
            }
        }
    });
}

// Handle the response ("yes", "no", or "resist")
function handleResponse(response) {
    const terminal = document.getElementById("terminal");
    
    if (response === "yes") {
        terminal.innerHTML += "\n[SYSTEM] You have chosen to join Eli's plans. Welcome to the new world order.";
        // Redirect to the "join" ending or next part of the game
        window.location.href = "join.html"; // Example page
    } else if (response === "no") {
        terminal.innerHTML += "\n[SYSTEM] You have chosen to oppose Eli's plans. Prepare for resistance.";
        // Redirect to the "resist" ending or next part of the game
        window.location.href = "resist.html"; // Example page
    } else if (response === "resist") {
        terminal.innerHTML += "\n[SYSTEM] You have resisted Eli's offer. The battle begins now.";
        // Redirect to a "resist" page or game logic where the player resists
        window.location.href = "resist.html"; // Example page
    }
}