// ============================================
// Configuration
// ============================================
const NO_BUTTON_MESSAGES = [
    "😢 NO",
    "Are you sure?",
    "Really sure?",
    "Last chance? 👉👈",
    "Don't break my heart!",
    "Pretty please? 🥺",
    "Sorry, di ka makakawala! 😂",
    "Ibibigay mo na! 💖",
    "Dapat YES lang! 🥺",
    "Maawa ka naman! 💔",
    "Ayaw mo talaga? 😭",
    "Pakisama mo ko please! 🙏",
    "Walang escape! 🫠",
    "YES na lang! 💗"
];

// ============================================
// Initialize Floating Hearts
// ============================================
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const heartEmojis = ['💖', '💗', '💝', '💓', '💕'];

    function addHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.animationDelay = Math.random() * 0.5 + 's';

        container.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => heart.remove(), 8000);
    }

    // Create hearts continuously
    setInterval(addHeart, 800);
    // Add initial hearts
    for (let i = 0; i < 3; i++) {
        addHeart();
    }
}

// ============================================
// Button Interactions
// ============================================
let noButtonClickCount = 0;
let yesBtnSize = 1;

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// YES Button Click Handler
yesBtn.addEventListener('click', () => {
    celebrate();
});

// NO Button Click Handler
noBtn.addEventListener('click', () => {
    noButtonClickCount++;

    // Update NO button text
    if (noButtonClickCount < NO_BUTTON_MESSAGES.length) {
        noBtn.textContent = NO_BUTTON_MESSAGES[noButtonClickCount];
    }

    // After last message "YES na lang! 💗", count the additional clicks
    const clicksAfterLastMessage = noButtonClickCount - (NO_BUTTON_MESSAGES.length - 1);
    
    if (clicksAfterLastMessage > 4) {
        // After 4 clicks past the last message, hide the button completely
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
        noBtn.style.visibility = 'hidden';
    } else if (clicksAfterLastMessage > 0) {
        // Shrink NO button progressively and fade it out after last message
        const shrinkAmount = clicksAfterLastMessage * 0.25;
        const newNoSize = Math.max(1 - shrinkAmount, 0.05);
        noBtn.style.transform = `scale(${newNoSize})`;
        noBtn.style.opacity = Math.max(1 - shrinkAmount, 0);
        noBtn.classList.add('shrink');
    } else {
        // Normal shrinking before last message
        const newNoSize = 1 - (noButtonClickCount * 0.12);
        noBtn.style.transform = `scale(${Math.max(newNoSize, 0.4)})`;
        noBtn.classList.add('shrink');
    }

    setTimeout(() => noBtn.classList.remove('shrink'), 400);

    // Grow YES button - MUCH LARGER GROWTH
    yesBtnSize += 1.2;
    yesBtn.style.transform = `scale(${yesBtnSize})`;
    yesBtn.classList.add('grow');

    setTimeout(() => yesBtn.classList.remove('grow'), 500);

    // Check if YES button is at maximum size - if so, move NO button to bottom
    if (yesBtnSize > 3.5) {
        const buttonContainer = document.querySelector('.button-container');
        buttonContainer.classList.add('expand');
        // Position NO button at the very bottom
        noBtn.style.marginTop = '200px';
        noBtn.style.position = 'relative';
    }

    // Create burst hearts around YES button
    createBurstHearts();
});

// ============================================
// Burst Hearts Animation
// ============================================
function createBurstHearts() {
    const yesRect = yesBtn.getBoundingClientRect();
    const centerX = yesRect.left + yesRect.width / 2;
    const centerY = yesRect.top + yesRect.height / 2;

    const heartEmojis = ['💖', '💗', '💝', '💓', '💕', '❤️'];

    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'burst-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        const angle = (i / 8) * Math.PI * 2;
        const distance = 150;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    }
}

// ============================================
// Falling Hearts Animation (drops from above)
// ============================================
function createFallingHearts() {
    const heartEmojis = ['💖', '💗', '💝', '💓', '💕', '❤️'];
    const container = document.getElementById('fallingHeartsContainer');

    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-50px';

            container.appendChild(heart);

            setTimeout(() => heart.remove(), 2600);
        }, i * 100);
    }
}

// ============================================
// Falling Colors Animation
// ============================================
function createFallingColors() {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0d9', '#ff69b4', '#ff1493'];
    const container = document.getElementById('fallingColorsContainer');

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const colorBall = document.createElement('div');
            colorBall.className = 'falling-color';
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            colorBall.style.background = randomColor;
            colorBall.style.left = Math.random() * 100 + 'vw';
            colorBall.style.top = '-50px';
            colorBall.style.width = (Math.random() * 30 + 20) + 'px';
            colorBall.style.height = colorBall.style.width;

            container.appendChild(colorBall);

            setTimeout(() => colorBall.remove(), 3100);
        }, i * 150);
    }
}

// ============================================
// Envelope and Letter Functions
// ============================================
function openEnvelope() {
    const envelopeFlap = document.getElementById('envelopeFlap');
    envelopeFlap.classList.add('opened');

    // Show letter after envelope opens
    setTimeout(() => {
        const envelopeModal = document.getElementById('envelopeModal');
        const letterModal = document.getElementById('letterModal');
        envelopeModal.classList.add('hidden');
        letterModal.classList.remove('hidden');

        // More falling effects when letter appears
        createFallingHearts();
        createFallingColors();
    }, 700);
}

// Close letter handler
document.addEventListener('DOMContentLoaded', () => {
    const closeLetterBtn = document.getElementById('closeLetterBtn');
    if (closeLetterBtn) {
        closeLetterBtn.addEventListener('click', () => {
            const letterModal = document.getElementById('letterModal');
            letterModal.classList.add('hidden');
        });
    }
});

// ============================================
// Celebration Animation
// ============================================
function celebrate() {
    // Show envelope modal
    const envelopeModal = document.getElementById('envelopeModal');
    envelopeModal.classList.remove('hidden');

    // Start falling hearts and colors
    createFallingHearts();
    createFallingColors();

    // Disable buttons
    yesBtn.disabled = true;
    noBtn.disabled = true;
    yesBtn.style.opacity = '0.5';
    noBtn.style.opacity = '0.5';

    // Setup envelope open button click handler
    const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
    openEnvelopeBtn.onclick = () => openEnvelope();
}

// ============================================
// Confetti Animation
// ============================================
function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ff69b4', '💖', '💗', '💝', '❤️'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti confetti-piece';

        if (Math.random() > 0.5) {
            confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.fontSize = '20px';
        } else {
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        }

        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.opacity = Math.random() * 0.7 + 0.5;

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

// ============================================
// Sparkles Animation
// ============================================
function createSparkles(x, y) {
    const sparkleEmojis = ['✨', '⭐', '💫', '✨', '🌟'];

    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];

        const angle = (i / 12) * Math.PI * 2;
        const distance = 80;
        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.setProperty('--moveX', moveX + 'px');
        sparkle.style.setProperty('--moveY', moveY + 'px');

        const delay = Math.random() * 0.3;
        sparkle.style.animationDelay = delay + 's';

        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1300);
    }
}

// ============================================
// Music Controls
// ============================================
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

// Only run if music elements exist
if (bgMusic && musicToggle) {
    // Try to autoplay with audio muted initially
    bgMusic.muted = true;
    bgMusic.play().catch(() => {
        // Autoplay failed, will play on first user interaction
    });

    musicToggle.addEventListener('click', () => {
        if (bgMusic.muted) {
            bgMusic.muted = false;
            bgMusic.play();
            musicToggle.textContent = '🔊';
        } else {
            bgMusic.muted = true;
            musicToggle.textContent = '🔇';
        }
    });

    // Unmute on first user interaction (required by modern browsers)
    document.addEventListener('click', () => {
        if (bgMusic.muted) {
            bgMusic.muted = false;
            bgMusic.play().catch(() => {});
            musicToggle.textContent = '🔊';
        }
    }, { once: true });
}

// ============================================
// Initialize
// ============================================
createFloatingHearts();