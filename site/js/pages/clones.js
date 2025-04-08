fetch('../logs/clones.json')
  .then(response => response.json())
  .then(clones => {
    const cloneList = document.getElementById("cloneList");
    const cloneInfo = document.getElementById("cloneInfo");

    Object.entries(clones).forEach(([category, cloneArray]) => {
      const section = document.createElement("div");
      section.classList.add("category");
      section.innerHTML = `<h3>${category}</h3><div class="carousel-wrapper mb-2"></div>`;
      const carousel = section.querySelector(".carousel-wrapper");

      cloneArray.forEach(clone => {
        const card = document.createElement("div");
        card.className = "clone-card";
        card.innerText = clone.name;

        // Check if we should show Dr. Hajile's card in the Eli section
        if (category === "Eli" && clone.name === "Dr. Hajile" && sessionStorage.getItem("eliRevealed") === "true") {
          card.classList.remove("hidden"); // Ensure the card is visible
        } else if (category !== "Eli" || (category === "Eli" && sessionStorage.getItem("eliRevealed") !== "true")) {
          card.classList.add("hidden"); // Hide Eli's section until revealed
        }

        card.onclick = () => {
          // If Dr. Hajile's file is clicked, set sessionStorage to mark it as read
          if (clone.name === "Dr. Hajile") {
            sessionStorage.setItem("drHajileFileRead", "true");
          }

          // Display the clone's information
          cloneInfo.innerHTML = `
            <strong>${clone.name}</strong><br>
            <em>Status:</em> ${clone.status}<br><br>
            ${clone.description}
          `;
        };

        carousel.appendChild(card);
      });

      cloneList.appendChild(section);
    });
  })
  .catch(err => {
    console.error("Failed to load clones.json", err);
  });
