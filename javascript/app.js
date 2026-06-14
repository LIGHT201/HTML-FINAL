
// Global Cookie Utility for persistent state tracking
const CookieTracker = {
    set(key, value, durationDays = 30) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (durationDays * 24 * 60 * 60 * 1000));
        document.cookie = `${key}=${value};expires=${expirationDate.toUTCString()};path=/;SameSite=Strict`;
    },
    get(key, fallBackValue) {
        const standardCookieString = `; ${document.cookie}`;
        const dataSegments = standardCookieString.split(`; ${key}=`);
        if (dataSegments.length === 2) {
            return dataSegments.pop().split(';').shift();
        }
        return fallBackValue;
    },
    clear(key) {
        document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
};

// Applies accessibility parameters instantly to the document body
function refreshVisualState() {
    const targetBody = document.body;

    // Load configurations (Scanlines default to true, Dark Mode defaults to true)
    const isScanlineActive = CookieTracker.get("scanlines", "true") === "true";
    const isHighContrast = CookieTracker.get("highContrast", "false") === "true";
    const isDarkMode = CookieTracker.get("darkMode", "true") === "true";
    const currentFontSizePercentage = CookieTracker.get("fontSize", "100");

    // Sync Scanlines visibility
    const scanlineOverlay = document.getElementById("scanlines");
    if (scanlineOverlay) {
        scanlineOverlay.style.display = isScanlineActive ? "block" : "none";
    }

    // Toggle stylesheet visual modifier classes
    targetBody.classList.toggle("high-contrast", isHighContrast);
    targetBody.classList.toggle("light-mode", !isDarkMode);
    
    // Set text scale dynamically
    targetBody.style.fontSize = `${currentFontSizePercentage}%`;
}

// Binds functional listeners to configuration components if present
function bindSettingsInterface() {
    const scanlineCheckbox = document.getElementById("scanlines-setting");
    const contrastCheckbox = document.getElementById("high-contrast-setting");
    const themeCheckbox = document.getElementById("dark-mode-setting");
    const fontRangeSlider = document.getElementById("font-size-setting");
    const fontDisplayLabel = document.getElementById("font-size-value");
    const globalResetButton = document.getElementById("reset-settings-btn");

    // Scanline Toggle Event
    if (scanlineCheckbox) {
        scanlineCheckbox.checked = CookieTracker.get("scanlines", "true") === "true";
        scanlineCheckbox.addEventListener("change", (event) => {
            CookieTracker.set("scanlines", event.target.checked);
            refreshVisualState();
        });
    }

    // High Contrast Toggle Event
    if (contrastCheckbox) {
        contrastCheckbox.checked = CookieTracker.get("highContrast", "false") === "true";
        contrastCheckbox.addEventListener("change", (event) => {
            CookieTracker.set("highContrast", event.target.checked);
            refreshVisualState();
        });
    }

    // Dark Mode Toggle Event
    if (themeCheckbox) {
        themeCheckbox.checked = CookieTracker.get("darkMode", "true") === "true";
        themeCheckbox.addEventListener("change", (event) => {
            CookieTracker.set("darkMode", event.target.checked);
            refreshVisualState();
        });
    }

    // Font Scaling Slider Events
    if (fontRangeSlider) {
        const activeScale = CookieTracker.get("fontSize", "100");
        fontRangeSlider.value = activeScale;
        if (fontDisplayLabel) fontDisplayLabel.textContent = `${activeScale}%`;

        fontRangeSlider.addEventListener("input", (event) => {
            const values = event.target.value;
            if (fontDisplayLabel) fontDisplayLabel.textContent = `${values}%`;
            CookieTracker.set("fontSize", values);
            refreshVisualState();
        });
    }

    // Hard System Reset Action
    if (globalResetButton) {
        globalResetButton.addEventListener("click", () => {
            if (confirm("Reset all customizations back to factory defaults?")) {
                CookieTracker.clear("scanlines");
                CookieTracker.clear("highContrast");
                CookieTracker.clear("darkMode");
                CookieTracker.clear("fontSize");
                location.reload();
            }
        });
    }
}

// Initialization pipeline
document.addEventListener("DOMContentLoaded", () => {
    refreshVisualState();
    bindSettingsInterface();
});