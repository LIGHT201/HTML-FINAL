/**
 * Simple Settings Manager
 * Handles all website settings persistently
 */

const Settings = {
    // Keys for localStorage
    STORAGE_KEY: "zombiz_settings",
    
    // Default settings
    DEFAULTS: {
        scanlines: false,
        highContrast: false,
        fontSize: 100,
        darkMode: true
    },

    // Get all settings
    getAll() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        return saved ? { ...this.DEFAULTS, ...JSON.parse(saved) } : this.DEFAULTS;
    },

    // Get single setting
    get(key) {
        const all = this.getAll();
        return all[key] !== undefined ? all[key] : this.DEFAULTS[key];
    },

    // Set single setting
    set(key, value) {
        const all = this.getAll();
        all[key] = value;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
        this.apply();
    },

    // Set multiple settings
    setMultiple(obj) {
        const all = this.getAll();
        Object.assign(all, obj);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
        this.apply();
    },

    // Reset to defaults
    reset() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.apply();
    },

    // Apply all settings to page
    apply() {
        const settings = this.getAll();
        
        // Apply scanlines
        this.applyScanlines(settings.scanlines);
        
        // Apply high contrast
        document.body.classList.toggle("high-contrast", settings.highContrast);
        
        // Apply font size
        document.documentElement.style.fontSize = settings.fontSize + "%";
        
        // Apply dark mode
        document.body.classList.toggle("light-mode", !settings.darkMode);
    },

    // Handle scanlines separately (remove all, add if needed)
    applyScanlines(enabled) {
        // Remove all existing scanlines
        document.querySelectorAll(".scanlines").forEach(el => el.remove());
        
        // Add scanlines if enabled
        if (enabled) {
            const overlay = document.createElement("div");
            overlay.classList.add("scanlines", "flicker-effect");
            document.body.appendChild(overlay);
        }
    }
};

// Apply settings when page loads
document.addEventListener("DOMContentLoaded", () => {
    Settings.apply();
});

// Also apply on immediate load (before DOM ready) for faster effect
Settings.apply();

