const StorageManager = {
    set(key, value) {
        localStorage.setItem(key, value);
    },
    get(key, fallbackValue) {
        const value = localStorage.getItem(key);
        return value !== null ? value : fallbackValue;
    },
    delete(key) {
        localStorage.removeItem(key);
    }
};

function refreshVisualState() {
    const targetBody = document.body;

    const isScanlineActive = StorageManager.get("scanlines", "true") === "true";
    const isHighContrast = StorageManager.get("highContrast", "false") === "true";
    const isDarkMode = StorageManager.get("darkMode", "true") === "true";
    const currentFontSizePercentage = StorageManager.get("fontSize", "100");

    const scanlineOverlay = document.getElementById("scanlines");
    if (scanlineOverlay) {
        scanlineOverlay.style.display = isScanlineActive ? "block" : "none";
    }

    targetBody.classList.toggle("high-contrast", isHighContrast);
    targetBody.classList.toggle("light-mode", !isDarkMode);
    targetBody.style.fontSize = `${currentFontSizePercentage}%`;
}

function initSettingsInterface() {
    const scanlineCheckbox = document.getElementById("scanlines-setting");
    const contrastCheckbox = document.getElementById("high-contrast-setting");
    const themeCheckbox = document.getElementById("dark-mode-setting");
    const fontRangeSlider = document.getElementById("font-size-setting");
    const fontDisplayLabel = document.getElementById("font-size-value");
    const globalResetButton = document.getElementById("reset-settings-btn");

    if (scanlineCheckbox) {
        scanlineCheckbox.checked = StorageManager.get("scanlines", "true") === "true";
        scanlineCheckbox.addEventListener("change", (e) => {
            StorageManager.set("scanlines", e.target.checked);
            refreshVisualState();
        });
    }

    if (contrastCheckbox) {
        contrastCheckbox.checked = StorageManager.get("highContrast", "false") === "true";
        contrastCheckbox.addEventListener("change", (e) => {
            StorageManager.set("highContrast", e.target.checked);
            refreshVisualState();
        });
    }

    if (themeCheckbox) {
        themeCheckbox.checked = StorageManager.get("darkMode", "true") === "true";
        themeCheckbox.addEventListener("change", (e) => {
            StorageManager.set("darkMode", e.target.checked);
            refreshVisualState();
        });
    }

    if (fontRangeSlider) {
        const activeScale = StorageManager.get("fontSize", "100");
        fontRangeSlider.value = activeScale;
        if (fontDisplayLabel) fontDisplayLabel.textContent = `${activeScale}%`;

        fontRangeSlider.addEventListener("input", (e) => {
            const scaleValue = e.target.value;
            if (fontDisplayLabel) fontDisplayLabel.textContent = `${scaleValue}%`;
            StorageManager.set("fontSize", scaleValue);
            refreshVisualState();
        });
    }

    if (globalResetButton) {
        globalResetButton.addEventListener("click", () => {
            if (confirm("Execute hard reset of all user preferences?")) {
                StorageManager.delete("scanlines");
                StorageManager.delete("highContrast");
                StorageManager.delete("darkMode");
                StorageManager.delete("fontSize");
                location.reload(); 
            }
        });
    }
}

// Map parameters and trigger logic
document.addEventListener("DOMContentLoaded", () => {
    refreshVisualState();
    initSettingsInterface();
});