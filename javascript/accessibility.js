/**
 * Accessibility Manager - Simplified and Fixed
 * Handles all accessibility features and settings
 */

class AccessibilityManager {
    constructor() {
        this.storageKey = "zombiz-accessibility";
        this.init();
    }

    /**
     * Initialize - Load settings and apply them immediately
     */
    init() {
        // Load saved settings or use defaults
        const saved = localStorage.getItem(this.storageKey);
        this.settings = saved ? JSON.parse(saved) : this.getDefaults();
        
        // Apply all settings
        this.applyScanlines();
        this.applyHighContrast();
        this.applyReduceMotion();
        this.applyFontSize();
        this.applyTextSpacing();
        this.applyLineHeight();
        this.applyDarkMode();
        
        // Only attach listeners if we're on the settings page
        if (document.getElementById("scanlines-toggle")) {
            this.attachEventListeners();
        }
    }

    /**
     * Get default settings
     */
    getDefaults() {
        return {
            scanlines: false,
            highContrast: false,
            reduceMotion: false,
            fontSize: 100,
            textSpacing: 0,
            lineHeight: 1.5,
            darkMode: true
        };
    }

    /**
     * Save settings to localStorage
     */
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
    }

    /**
     * Apply scanlines setting
     */
    applyScanlines() {
        // Remove all scanlines first
        document.querySelectorAll(".scanlines").forEach(el => el.remove());
        
        // Add scanlines only if enabled
        if (this.settings.scanlines) {
            const overlay = document.createElement("div");
            overlay.classList.add("scanlines", "flicker-effect");
            document.body.appendChild(overlay);
        }
    }

    /**
     * Apply high contrast setting
     */
    applyHighContrast() {
        document.body.classList.toggle("high-contrast", this.settings.highContrast);
    }

    /**
     * Apply reduce motion setting
     */
    applyReduceMotion() {
        document.body.classList.toggle("reduce-motion", this.settings.reduceMotion);
    }

    /**
     * Apply font size setting
     */
    applyFontSize() {
        document.documentElement.style.fontSize = this.settings.fontSize + "%";
    }

    /**
     * Apply text spacing setting
     */
    applyTextSpacing() {
        document.documentElement.style.letterSpacing = (this.settings.textSpacing * 0.1) + "em";
    }

    /**
     * Apply line height setting
     */
    applyLineHeight() {
        document.documentElement.style.lineHeight = this.settings.lineHeight;
    }

    /**
     * Apply dark mode setting
     */
    applyDarkMode() {
        document.body.classList.toggle("light-mode", !this.settings.darkMode);
    }

    /**
     * Update UI checkboxes and sliders from settings
     */
    updateUI() {
        // Checkboxes
        const checkboxIds = ["scanlines-toggle", "high-contrast-toggle", "reduce-motion-toggle", "dark-mode-toggle"];
        const settingNames = ["scanlines", "highContrast", "reduceMotion", "darkMode"];
        
        checkboxIds.forEach((id, index) => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = this.settings[settingNames[index]];
            }
        });
        
        // Sliders
        const fontSizeSlider = document.getElementById("font-size");
        if (fontSizeSlider) fontSizeSlider.value = this.settings.fontSize;
        
        const textSpacingSlider = document.getElementById("text-spacing");
        if (textSpacingSlider) textSpacingSlider.value = this.settings.textSpacing;
        
        const lineHeightSlider = document.getElementById("line-height");
        if (lineHeightSlider) lineHeightSlider.value = this.settings.lineHeight;
        
        // Update display values
        document.getElementById("font-size-value")?.textContent = this.settings.fontSize + "%";
        document.getElementById("text-spacing-value")?.textContent = this.settings.textSpacing === 0 ? "Normal" : this.settings.textSpacing.toFixed(1);
        document.getElementById("line-height-value")?.textContent = this.settings.lineHeight === 1.5 ? "Normal" : this.settings.lineHeight.toFixed(2);
    }

    /**
     * Attach event listeners for settings page
     */
    attachEventListeners() {
        // Update UI to reflect current settings
        this.updateUI();
        
        // Checkbox listeners
        ["scanlines-toggle", "high-contrast-toggle", "reduce-motion-toggle", "dark-mode-toggle"].forEach((id) => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener("change", (e) => {
                    const settingName = id.replace("-toggle", "").replace(/([A-Z])/g, "-$1").toLowerCase().replace(/-/g, "");
                    const settingMap = {
                        "scanlinestogg": "scanlines",
                        "scanlinestogg": "scanlines",
                        "highcontrasttogg": "highContrast",
                        "reducemotiontogg": "reduceMotion",
                        "darkmodetogg": "darkMode"
                    };
                    
                    if (id === "scanlines-toggle") this.settings.scanlines = e.target.checked;
                    if (id === "high-contrast-toggle") this.settings.highContrast = e.target.checked;
                    if (id === "reduce-motion-toggle") this.settings.reduceMotion = e.target.checked;
                    if (id === "dark-mode-toggle") this.settings.darkMode = e.target.checked;
                    
                    this.save();
                    this.applyScanlines();
                    this.applyHighContrast();
                    this.applyReduceMotion();
                    this.applyDarkMode();
                });
            }
        });
        
        // Font size slider
        const fontSizeSlider = document.getElementById("font-size");
        if (fontSizeSlider) {
            fontSizeSlider.addEventListener("input", (e) => {
                this.settings.fontSize = parseInt(e.target.value);
                document.getElementById("font-size-value").textContent = this.settings.fontSize + "%";
                this.applyFontSize();
                this.save();
            });
        }
        
        // Text spacing slider
        const textSpacingSlider = document.getElementById("text-spacing");
        if (textSpacingSlider) {
            textSpacingSlider.addEventListener("input", (e) => {
                this.settings.textSpacing = parseFloat(e.target.value);
                document.getElementById("text-spacing-value").textContent = this.settings.textSpacing === 0 ? "Normal" : this.settings.textSpacing.toFixed(1);
                this.applyTextSpacing();
                this.save();
            });
        }
        
        // Line height slider
        const lineHeightSlider = document.getElementById("line-height");
        if (lineHeightSlider) {
            lineHeightSlider.addEventListener("input", (e) => {
                this.settings.lineHeight = parseFloat(e.target.value);
                document.getElementById("line-height-value").textContent = this.settings.lineHeight === 1.5 ? "Normal" : this.settings.lineHeight.toFixed(2);
                this.applyLineHeight();
                this.save();
            });
        }
        
        // Reset button
        const resetBtn = document.getElementById("reset-settings");
        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                if (confirm("Are you sure you want to reset all accessibility settings to defaults?")) {
                    localStorage.removeItem(this.storageKey);
                    this.settings = this.getDefaults();
                    this.init();
                }
            });
        }
    }
}

// Initialize accessibility manager when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        window.accessibilityManager = new AccessibilityManager();
    });
} else {
    window.accessibilityManager = new AccessibilityManager();
}

