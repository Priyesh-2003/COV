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
cycleWords(); 
const counters = document.querySelectorAll('.counter');
let started = false;

function easeOut(current, target) {
    let progress = current / target;
    let eased = 1 - Math.pow(1 - progress, 3);
    return eased * target;
}

function startCount() {
    counters.forEach(counter => {
        let target = +counter.getAttribute('data-target');
        let isBig = target > 1000;
        let duration = isBig ? 1800 : 1200;
        let startTime = null;

        function animate(time) {
            if (!startTime) startTime = time;
            let elapsed = time - startTime;
            let progress = Math.min(elapsed / duration, 1);

            if (isBig) {
                counter.innerText = Math.ceil(easeOut(progress * target, target));
            } else {
                counter.innerText = Math.ceil(progress * target);
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.innerText = target;
            }
        }

        requestAnimationFrame(animate);
    });
}

window.addEventListener('scroll', () => {
    let section = document.getElementById('vimpactc');
    let position = section.getBoundingClientRect().top;
    if (position < window.innerHeight - 100 && !started) {
        started = true;
        startCount();
    }
});
