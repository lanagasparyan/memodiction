// Simple test popup to debug
console.log('Test popup script loaded!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, creating test popup...');

    // Create a simple popup immediately
    const testPopup = document.createElement('div');
    testPopup.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            background: #4a7c7e;
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            font-family: Arial, sans-serif;
        ">
            <h3 style="margin: 0 0 10px 0;">🚀 Test Popup</h3>
            <p style="margin: 0 0 15px 0; font-size: 14px;">This is a test popup to check if JavaScript is working!</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: white;
                color: #4a7c7e;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
            ">Close</button>
        </div>
    `;

    document.body.appendChild(testPopup);
    console.log('Test popup should be visible now!');
});