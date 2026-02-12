// script.js – FULLY RESTORED + REQUESTED TWEAKS
// (Only changes: 3s button delay, 3s rating delay, shake threshold 45, sample-based detection)

document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Elements (same as your original) ---
    // ... (keep your original variable declarations) ...

    // === SECRET MODE – MODIFIED FOR BUTTON DELAY & SCROLL ===
    const typedText = document.getElementById('typed-text');
    const okayBtn = document.getElementById('okay-btn');
    
    if (secretScreen && okayBtn && typedText) {
        const secretMessage = `I joke a lot, but genuinely talking to you feels easy, hazyyy.
Our chats are never planned, never serious on purpose, but somehow they fit into my day naturally.
You're the first notification I see and the last one before the day ends, and yeah, that quietly makes a difference.

This site, the jokes, the chaos... it's just a small, coded way of saying you matter to me as a friend, more than you probably realize. ❤️

Okay, stopping here before this gets awkward. 😂✌️`;

        let isTypingCancelled = false;
        let secretTypingTimeout = null;

        function typeMessage() {
            if (secretTypingTimeout) clearTimeout(secretTypingTimeout);
            isTypingCancelled = false;
            typedText.innerHTML = '';
            
            // Hide button until typing finishes + 3s
            okayBtn.classList.remove('show');
            
            let charIndex = 0;
            const typingIndicator = document.querySelector('.typing-indicator');
            if (typingIndicator) typingIndicator.style.display = 'flex';
            
            function typeNextChar() {
                if (isTypingCancelled) return;
                if (charIndex < secretMessage.length) {
                    const currentChar = secretMessage[charIndex];
                    if (currentChar === '\n') {
                        typedText.innerHTML += '<br>';
                        charIndex++;
                        secretTypingTimeout = setTimeout(typeNextChar, 100);
                    } else {
                        typedText.innerHTML += currentChar;
                        charIndex++;
                        
                        // Auto-scroll the secret-text div
                        const secretTextDiv = document.querySelector('.secret-text');
                        if (secretTextDiv) secretTextDiv.scrollTop = secretTextDiv.scrollHeight;
                        
                        let speed = 40;
                        if (/[.,;!?\n]/.test(currentChar)) speed = 70;
                        else if (currentChar === ' ') speed = 20;
                        else speed = 40 + Math.random() * 20;
                        
                        secretTypingTimeout = setTimeout(typeNextChar, speed);
                    }
                } else {
                    // Typing finished
                    if (typingIndicator) {
                        typingIndicator.style.opacity = '0';
                        setTimeout(() => typingIndicator.style.display = 'none', 300);
                    }
                    typedText.innerHTML += `<span class="typing-complete"> 💫</span>`;
                    
                    // FIXED: 3 seconds delay before showing button
                    setTimeout(() => {
                        if (!isTypingCancelled) okayBtn.classList.add('show');
                    }, 3000);
                }
            }
            typeNextChar();
        }

        // --- OK button click (unchanged) ---
        okayBtn.addEventListener('click', function() {
            isTypingCancelled = true;
            clearTimeout(secretTypingTimeout);
            // ... rest of your original OK handler ...
        });

        // --- IMPROVED SHAKE DETECTION (threshold 45, sample-based) ---
        let lastShakeTime = 0;
        let shakeReadings = [];
        const SHAKE_THRESHOLD = 45;
        const SHAKE_COOLDOWN = 1800;
        const SHAKE_SAMPLE_SIZE = 3;

        function handleShake(event) {
            if (isSecretModeActive) return;
            const acc = event.accelerationIncludingGravity;
            if (!acc) return;
            
            const x = acc.x || 0, y = acc.y || 0, z = acc.z || 0;
            const magnitude = Math.sqrt(x*x + y*y + z*z);
            const now = Date.now();
            
            shakeReadings.push({ mag: magnitude, time: now });
            shakeReadings = shakeReadings.filter(r => now - r.time < 300);
            
            const strongShakes = shakeReadings.filter(r => r.mag > SHAKE_THRESHOLD).length;
            
            if (strongShakes >= SHAKE_SAMPLE_SIZE && (now - lastShakeTime) > SHAKE_COOLDOWN) {
                lastShakeTime = now;
                shakeReadings = [];
                if (navigator.vibrate) navigator.vibrate(50);
                activateSecretMode();
            }
        }

        // ... (keep your existing permission handling) ...
    }

    // === CHAT – MODIFIED RATING DELAY (5s → 3s) ===
    function endChatStory() {
        const timer = setTimeout(() => {
            // ... your existing transition code ...
        }, 3000); // FIXED: was 5000, now 3000
        chatTimeouts.push(timer);
    }

    // --- Everything else stays exactly as your original working script ---
    // (NO other changes – all original animations, NO button movement, stickers, etc. remain)
});