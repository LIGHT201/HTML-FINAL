// Utility object to handle browser cookies
const CookieManager = {
    set(name, value, days = 30) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Strict`;
    },
    get(name, defaultValue) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return defaultValue;
    },
    delete(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
};

// Apply saved settings instantly to the active DOM element
function applyAccessibilitySettings() {
    const body = document.body;
    
    // Read current settings from cookies
    const scanlines = CookieManager.get('scanlines', 'true') === 'true';
    const highContrast = CookieManager.get('highContrast', 'false') === 'true';
    const darkMode = CookieManager.get('darkMode', 'true') === 'true';
    const fontSize = CookieManager.get('fontSize', '100');

    // Toggle CSS layout classes based on values
    const scanlineDiv = document.getElementById('scanlines');
    if (scanlineDiv) {
        scanlineDiv.style.display = scanlines ? 'block' : 'none';
    }

    body.classList.toggle('high-contrast', highContrast);
    
    // Toggle light mode if dark mode is explicitly disabled
    body.classList.toggle('light-mode', !darkMode);

    // Apply fluid structural scaling
    body.style.fontSize = `${fontSize}%`;
}

// Automatically execute configurations when structural elements load
document.addEventListener("DOMContentLoaded", applyAccessibilitySettings);