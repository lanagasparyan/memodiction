// Survey Popup JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const SURVEY_URL = 'https://forms.gle/gxoGFDWe6QjFebPf9'; // Replace with your actual form URL
    const POPUP_DELAY = 3000; // Show popup after 3 seconds (for testing)
    const STORAGE_KEY = 'memodiction_survey_shown';
    const STORAGE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    // Check if popup should be shown
    function shouldShowPopup() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return true;

        const data = JSON.parse(stored);
        const now = new Date().getTime();

        // Show if expired or if user dismissed (not completed)
        return now > data.expiry || data.action === 'dismissed';
    }

    // Create popup HTML
    function createPopup() {
        const popupHTML = `
            <div id="survey-popup" class="survey-popup">
                <div class="survey-popup-header">
                    <button class="survey-popup-close" onclick="closeSurveyPopup()">&times;</button>
                    <div class="survey-popup-icon"></div>
                    <h3 class="survey-popup-title">Help Us Improve MemoDiction! 🎯</h3>
                    <p class="survey-popup-subtitle">We're working hard to make your vocabulary learning experience even better</p>
                </div>
                <div class="survey-popup-body">
                    <p class="survey-popup-message">
                        Your feedback is invaluable! Share your thoughts and help us build features that truly matter to you.
                    </p>
                    <div class="survey-popup-actions">
                        <a href="${SURVEY_URL}" target="_blank" class="survey-btn survey-btn-primary" onclick="completeSurvey()">
                            📝 Take Quick Survey
                            <span style="font-size: 0.75em; opacity: 0.8;">(2 min)</span>
                        </a>
                        <button class="survey-btn survey-btn-secondary" onclick="remindLater()">
                            ⏰ Remind me later
                        </button>
                    </div>
                </div>
                <div class="survey-popup-footer">
                    🔒 Your responses help us prioritize improvements
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }

    // Show popup with animation
    function showPopup() {
        const popup = document.getElementById('survey-popup');
        if (popup) {
            popup.classList.add('show', 'animate-in');
        }
    }

    // Close popup
    window.closeSurveyPopup = function() {
        const popup = document.getElementById('survey-popup');
        if (popup) {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 400);
        }

        // Mark as dismissed
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            action: 'dismissed',
            timestamp: new Date().getTime(),
            expiry: new Date().getTime() + (2 * 24 * 60 * 60 * 1000) // Show again in 2 days
        }));
    };

    // Handle survey completion
    window.completeSurvey = function() {
        // Mark as completed
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            action: 'completed',
            timestamp: new Date().getTime(),
            expiry: new Date().getTime() + STORAGE_EXPIRY // Don't show again for 7 days
        }));

        closeSurveyPopup();

        // Optional: Show thank you message
        setTimeout(() => {
            showThankYouMessage();
        }, 500);
    };

    // Remind later
    window.remindLater = function() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            action: 'remind_later',
            timestamp: new Date().getTime(),
            expiry: new Date().getTime() + (24 * 60 * 60 * 1000) // Show again tomorrow
        }));

        closeSurveyPopup();
    };

    // Show thank you message
    function showThankYouMessage() {
        const thankYouHTML = `
            <div id="thank-you-popup" class="survey-popup show" style="background: linear-gradient(135deg, #5a8f92 0%, #3d6466 100%); color: white;">
                <div class="survey-popup-header">
                    <button class="survey-popup-close" onclick="document.getElementById('thank-you-popup').remove()" style="color: white;">&times;</button>
                    <div class="survey-popup-icon" style="background: rgba(255,255,255,0.2);">
                        <span style="font-size: 1.5rem;">🙏</span>
                    </div>
                    <h3 class="survey-popup-title" style="color: white;">Thank You!</h3>
                    <p class="survey-popup-subtitle" style="color: rgba(255,255,255,0.9);">Your feedback helps us build a better MemoDiction</p>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', thankYouHTML);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            const thankYou = document.getElementById('thank-you-popup');
            if (thankYou) {
                thankYou.classList.remove('show');
                setTimeout(() => thankYou.remove(), 400);
            }
        }, 3000);
    }

    // Initialize popup
    function initPopup() {
        if (!shouldShowPopup()) return;

        // Create popup
        createPopup();

        // Show popup after delay
        setTimeout(() => {
            showPopup();
        }, POPUP_DELAY);
    }

    // Smart timing - show popup when user is engaged
    let scrollCount = 0;
    let timeOnPage = 0;

    // Track engagement
    const engagementTimer = setInterval(() => {
        timeOnPage += 1000;
    }, 1000);

    window.addEventListener('scroll', () => {
        scrollCount++;
    });

    // Show popup when user is engaged (scrolled a bit or spent time)
    setTimeout(() => {
        if (scrollCount > 3 || timeOnPage > 30000) { // Scrolled or spent 30s
            initPopup();
        }
    }, Math.min(POPUP_DELAY, 10000)); // But not more than 10s

    // Fallback timer
    setTimeout(initPopup, POPUP_DELAY);

    // Cleanup
    window.addEventListener('beforeunload', () => {
        clearInterval(engagementTimer);
    });

    // Test function - you can call this from browser console
    window.testSurveyPopup = function() {
        // Clear any existing storage
        localStorage.removeItem(STORAGE_KEY);
        // Create and show popup immediately
        createPopup();
        setTimeout(showPopup, 100);
    };

    // Debug info
    console.log('Survey popup script loaded. To test immediately, run: testSurveyPopup()');
});