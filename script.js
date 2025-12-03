const words = ["Integrity", "Excellence", "Innovation"];
let index = 0;
const element = document.getElementById("changingWords");

function cycleWords() {
    // Step 1: Set the word
    element.textContent = words[index];

    // Step 2: Fade in
    element.style.opacity = 1;

    // Step 3: After 1.5 seconds, fade out
    setTimeout(() => {
        element.style.opacity = 0;
    }, 1500);

    // Step 4: After fading out (1.5 + 1 sec = 2.5 sec), change word
    setTimeout(() => {
        index = (index + 1) % words.length; // next word
        cycleWords(); // repeat
    }, 2500);
}

// Start cycle
cycleWords();
