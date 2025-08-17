document.addEventListener("DOMContentLoaded", () => {
    const button = document.createElement("button");
    button.textContent = "Download Resume"; // you can change later
    button.classList.add("custom-btn");

    button.addEventListener("click", () => {
        alert("Thanks for visiting my portfolio! Resume will be available soon.");
        // In future: window.open("resume.pdf", "_blank");
    });

    // Add button inside "About Me" section
    document.querySelector("#about").appendChild(button);
});