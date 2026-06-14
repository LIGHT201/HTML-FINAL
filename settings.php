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
                        <p class="setting-description">Use dark theme (enabled by default) (Dear god.. why..?).</p>
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
                document.addEventListener("DOMContentLoaded", () => {
                    // Pull current configurations from active session cookies
                    const scanlinesVal = CookieManager.get('scanlines', 'true') === 'true';
                    const highContrastVal = CookieManager.get('highContrast', 'false') === 'true';
                    const darkModeVal = CookieManager.get('darkMode', 'true') === 'true';
                    const fontSizeVal = CookieManager.get('fontSize', '100');

                    // Bind active interface element states to variables
                    const scanlinesBox = document.getElementById("scanlines-setting");
                    const highContrastBox = document.getElementById("high-contrast-setting");
                    const darkModeBox = document.getElementById("dark-mode-setting");
                    const fontSizeSlider = document.getElementById("font-size-setting");
                    const fontSizeLabel = document.getElementById("font-size-value");

                    // Render existing states to UI
                    scanlinesBox.checked = scanlinesVal;
                    highContrastBox.checked = highContrastVal;
                    darkModeBox.checked = darkModeVal;
                    fontSizeSlider.value = fontSizeVal;
                    fontSizeLabel.textContent = fontSizeVal + "%";
                    
                    // Listeners to update cookies and instantly apply the changes
                    scanlinesBox.addEventListener("change", (e) => {
                        CookieManager.set("scanlines", e.target.checked);
                        applyAccessibilitySettings();
                    });
                    
                    highContrastBox.addEventListener("change", (e) => {
                        CookieManager.set("highContrast", e.target.checked);
                        applyAccessibilitySettings();
                    });
                    
                    darkModeBox.addEventListener("change", (e) => {
                        CookieManager.set("darkMode", e.target.checked);
                        applyAccessibilitySettings();
                    });
                    
                    fontSizeSlider.addEventListener("input", (e) => {
                        fontSizeLabel.textContent = e.target.value + "%";
                        CookieManager.set("fontSize", e.target.value);
                        applyAccessibilitySettings();
                    });
                    
                    // Clear out variables back to defaults
                    document.getElementById("reset-settings-btn").addEventListener("click", () => {
                        if (confirm("Reset all settings to defaults?")) {
                            CookieManager.delete("scanlines");
                            CookieManager.delete("highContrast");
                            CookieManager.delete("darkMode");
                            CookieManager.delete("fontSize");
                            location.reload();
                        }
                    });
                });
            </script>

<?php include 'footer.php'; ?>