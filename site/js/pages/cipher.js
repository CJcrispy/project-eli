document.addEventListener("DOMContentLoaded", function() {
    // Vigenère Cipher Function
    function vigenereCipher(text, key) {
      let result = '';
      let keyIndex = 0;
      // Loop through each character in the text
      for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
          let code = text.charCodeAt(i);
          let offset = char.toUpperCase() === char ? 65 : 97;
          let newChar = String.fromCharCode(((code - offset + key[keyIndex].toUpperCase().charCodeAt(0) - 65) % 26) + offset);
          result += newChar;
          keyIndex = (keyIndex + 1) % key.length;
        } else {
          result += char;  // Non-alphabetical characters stay the same
        }
      }
      return result;
    }
  
    // Function to store the cipher completion status in sessionStorage
    function storeCipherCompletion() {
      sessionStorage.setItem("operationUnityCompleted", "true"); // Set sessionStorage flag
      alert("Cipher completed! New classified folder unlocked.");
    }
  
    // Check if the player has completed the cipher challenge before
    if (sessionStorage.getItem("operationUnityCompleted") === "true") {
      document.getElementById("cipher-result").textContent = "You have already completed the cipher challenge.";
    }
  
    // Handling the button click event to decode the text
    document.getElementById("decode-button").addEventListener("click", function() {
      const decodedText = document.getElementById("decoded-text").value.trim();
      const correctPhrase = "Bibidibobidi you are now my property";
      const resultDiv = document.getElementById("cipher-result");
  
      if (decodedText === correctPhrase) {
        resultDiv.textContent = "Congratulations! You've decoded the message successfully.";
        resultDiv.classList.remove("incorrect");
        resultDiv.classList.add("correct");
        storeCipherCompletion();
      } else {
        resultDiv.textContent = "Incorrect. Try again!";
        resultDiv.classList.remove("correct");
        resultDiv.classList.add("incorrect");
      }
    });
  });
  