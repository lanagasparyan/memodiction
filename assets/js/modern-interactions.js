// Modern interactions and animations for MemoDiction

document.addEventListener('DOMContentLoaded', function() {
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all definition boxes for animations
    document.querySelectorAll('.definition-box, .etymology-box, .idioms-box, .misconceptions-box').forEach(box => {
        box.classList.add('fade-in-element');
        observer.observe(box);
    });

    // Enhance pronunciation button with ripple effect
    const speakerBtn = document.querySelector('.speaker-btn');
    if (speakerBtn) {
        speakerBtn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Add hover effect to word cards with tilt
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Enhance search button with pulse animation
    const searchBtn = document.querySelector('#home-search-link');
    if (searchBtn) {
        searchBtn.addEventListener('mouseenter', function() {
            this.classList.add('pulse-animation');
        });

        searchBtn.addEventListener('mouseleave', function() {
            this.classList.remove('pulse-animation');
        });
    }

    // Add smooth reveal for page elements
    const pageElements = document.querySelectorAll('h1, h2, p, ul, ol');
    pageElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 50);
    });

    // Add copy-to-clipboard functionality for examples
    document.querySelectorAll('.definition-box li, .idioms-box p').forEach(element => {
        element.style.cursor = 'pointer';
        element.title = 'Click to copy';

        element.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Show copied feedback
                const feedback = document.createElement('span');
                feedback.className = 'copy-feedback';
                feedback.textContent = 'Copied!';
                this.appendChild(feedback);

                setTimeout(() => {
                    feedback.remove();
                }, 2000);
            });
        });
    });

    // Progressive gradient animation for word box
    const wordBox = document.querySelector('.word-box');
    if (wordBox) {
        let gradientAngle = 135;
        setInterval(() => {
            gradientAngle = (gradientAngle + 1) % 360;
            wordBox.style.background = `linear-gradient(${gradientAngle}deg, #5a8f92 0%, #3d6466 100%)`;
        }, 50);
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .pulse-animation {
        animation: pulse 1s infinite;
    }

    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0.5rem 1rem rgba(94, 114, 228, 0.3);
        }
        50% {
            box-shadow: 0 0.5rem 2rem rgba(94, 114, 228, 0.5);
        }
    }

    .copy-feedback {
        position: absolute;
        background: var(--success-color, #2dce89);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        margin-left: 0.5rem;
        animation: fadeInOut 2s ease;
    }

    @keyframes fadeInOut {
        0%, 100% { opacity: 0; }
        20%, 80% { opacity: 1; }
    }

    .card {
        transition: transform 0.2s ease, box-shadow 0.3s ease;
        transform-style: preserve-3d;
    }
`;
document.head.appendChild(style);