// ==================== NAVIGATION & HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

hamburger.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking on a nav link (but not dropdown parent)
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close menu if clicking dropdown parent on mobile
        if (window.innerWidth <= 768 && link.parentElement.classList.contains('nav-item')) {
            return; // Let the mobile dropdown toggle handle this
        }
        
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// ==================== MOBILE DROPDOWN TOGGLE ====================
// Mobile dropdown toggle for "About Us"
if (window.innerWidth <= 768) {
    const navItem = document.querySelector('.nav-item');
    if (navItem) {
        const navItemLink = navItem.querySelector('a');
        
        navItemLink.addEventListener('click', function(e) {
            e.preventDefault();
            navItem.classList.toggle('mobile-active');
        });
    }
}

// Clone right buttons into mobile menu
const navRight = document.querySelector('.nav-right');
if (navRight && window.innerWidth <= 768) {
    const registerBtn = navRight.querySelector('.register-btn');
    const loginBtn = navRight.querySelector('.login-btn');
    
    if (registerBtn && loginBtn) {
        const registerClone = registerBtn.cloneNode(true);
        const loginClone = loginBtn.cloneNode(true);
        navMenu.appendChild(registerClone);
        navMenu.appendChild(loginClone);
    }
}

// ==================== HERO SECTION TEXT ANIMATION ====================
const texts = [
    "Excellence & Innovation",
    "Professional Standards",
    "Global Recognition",
    "Industry Leadership"
];
let currentIndex = 0;
const changingText = document.getElementById('changingText');

function changeText() {
    if (changingText) {
        changingText.style.opacity = '0';
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            changingText.textContent = texts[currentIndex];
            changingText.style.opacity = '1';
        }, 500);
    }
}

if (changingText) {
    changingText.style.opacity = '1';
    setInterval(changeText, 3000);
}

// ==================== COUNTER ANIMATION ====================
const counters = document.querySelectorAll('.stat-number[data-target]');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + '+';
        }
    };
    updateCounter();
};

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));