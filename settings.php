<?php $pageTitle = 'Zombiz - Settings'; ?>
<?php include 'header.php'; ?>

            <h1>Settings</h1>
            
            <div class="settings-container">
                
                <div class="settings-section">
                    <h2>Visual Effects</h2>
                    
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" id="scanlines-setting" class="setting-checkbox">
                            <span>Scanlines Effect</span>
                        </label>
                        <p class="setting-description">Toggle the retro scanlines overlay effect.</p>
                    </div>

                    <div class="setting-item">
                        <label>
                            <input type="checkbox" id="high-contrast-setting" class="setting-checkbox">
                            <span>High Contrast</span>
                        </label>
                        <p class="setting-description">Increase color contrast for better readability.</p>
                    </div>

                    <div class="setting-item">
                        <label>
                            <input type="checkbox" id="dark-mode-setting" class="setting-checkbox">
                            <span>Dark Mode</span>
                        </label>
                        <p class="setting-description">Use dark theme (enabled by default).</p>
                    </div>
                </div>

                <div class="settings-section">
                    <h2>Text Size</h2>
                    
                    <div class="setting-item">
                        <label for="font-size-setting">
                            Font Size: <span id="font-size-value">100%</span>
                        </label>
                        <input type="range" id="font-size-setting" class="setting-slider" min="80" max="150" value="100" step="10">
                        <p class="setting-description">Adjust text size across the website.</p>
                    </div>
                </div>

                <div class="settings-section">
                    <h2>Actions</h2>
                    <button id="reset-settings-btn" class="reset-btn">Reset All Settings</button>
                </div>

            </div>

            <script>
                // Initialize settings page
                document.addEventListener("DOMContentLoaded", () => {
                    const settings = Settings.getAll();
                    
                    // Set checkbox states
                    document.getElementById("scanlines-setting").checked = settings.scanlines;
                    document.getElementById("high-contrast-setting").checked = settings.highContrast;
                    document.getElementById("dark-mode-setting").checked = settings.darkMode;
                    document.getElementById("font-size-setting").value = settings.fontSize;
                    document.getElementById("font-size-value").textContent = settings.fontSize + "%";
                    
                    // Checkbox listeners
                    document.getElementById("scanlines-setting").addEventListener("change", (e) => {
                        Settings.set("scanlines", e.target.checked);
                    });
                    
                    document.getElementById("high-contrast-setting").addEventListener("change", (e) => {
                        Settings.set("highContrast", e.target.checked);
                    });
                    
                    document.getElementById("dark-mode-setting").addEventListener("change", (e) => {
                        Settings.set("darkMode", e.target.checked);
                    });
                    
                    // Font size slider
                    document.getElementById("font-size-setting").addEventListener("input", (e) => {
                        const size = parseInt(e.target.value);
                        document.getElementById("font-size-value").textContent = size + "%";
                        Settings.set("fontSize", size);
                    });
                    
                    // Reset button
                    document.getElementById("reset-settings-btn").addEventListener("click", () => {
                        if (confirm("Reset all settings to defaults?")) {
                            Settings.reset();
                            location.reload();
                        }
                    });
                });
            </script>

<?php include 'footer.php'; ?>


