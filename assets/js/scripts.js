const cursor = document.querySelector('.cursor');
const animatedIcons = document.querySelector('.animated-icons');
let isMobile = window.innerWidth <= 768;

let cursorX = 0;
let cursorY = 0;
let currentX = 0;
let currentY = 0;

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function updateCursor() {
    currentX = lerp(currentX, cursorX, 0.1);
    currentY = lerp(currentY, cursorY, 0.1);

    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(updateCursor);
}

let lastMoveTime = 0;
document.addEventListener('mousemove', e => {
    const currentTime = Date.now();
    if (currentTime - lastMoveTime > 16) {  // Limit to ~60fps
        cursorX = e.clientX;
        cursorY = e.clientY;
        cursor.classList.add('show');
        lastMoveTime = currentTime;
    }
});

document.addEventListener('mouseover', e => {
    if (e.target.classList.contains('cta-btn') || e.target.classList.contains('logo') || e.target.closest('.social-icons')) {
        cursor.classList.add('hover');
    }
});

document.addEventListener('mouseout', () => {
    cursor.classList.remove('hover');
});

function createIcon() {
    if (animatedIcons.children.length >= (isMobile ? 5 : 15)) return;

    const icon = document.createElement('div');
    icon.classList.add('animated-icon');

    const size = Math.random() * 30 + 10;
    icon.style.width = `${size}px`;
    icon.style.height = `${size}px`;

    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    icon.style.left = `${startX}%`;
    icon.style.top = `${startY}%`;

    const animationDuration = Math.random() * 10 + 5;
    const animationDelay = Math.random() * 5;

    icon.style.animation = `float ${animationDuration}s ${animationDelay}s infinite alternate ease-in-out`;

    animatedIcons.appendChild(icon);
}

function updateIcons() {
    isMobile = window.innerWidth <= 768;
    while (animatedIcons.children.length > (isMobile ? 5 : 15)) {
        animatedIcons.removeChild(animatedIcons.lastChild);
    }
}

window.addEventListener('resize', updateIcons);

// Create initial set of icons
for (let i = 0; i < (isMobile ? 5 : 15); i++) {
    createIcon();
}

// Countdown Timer
const countDownDate = new Date("2025-01-01T00:00:00").getTime();

const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}, 1000);

// Start the cursor animation
requestAnimationFrame(updateCursor);