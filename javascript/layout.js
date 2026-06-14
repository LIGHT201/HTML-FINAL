document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const mainContent = document.querySelector("main.main");

    if (!mainContent) return;

    const scanlines = document.createElement("div");
    scanlines.id = "scanlines";
    scanlines.className = "scanlines";
    body.insertBefore(scanlines, body.firstChild);

    const header = document.createElement("header");
    header.className = "top";
    header.innerHTML = `
        <img src="Assets/Zombiz Logo.png" alt="Zombiz Official Logo" class="logo" decoding="async">
        <div class="topcontainer">
            <div class="marq" role="marquee">NEWS BREAK: NEW WEBSITE CALLED "Zombiz" STRIKES, WEBSITE GOES LIVE, VISIT NOW!</div>
        </div>
    `;
    body.insertBefore(header, mainContent);

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "content";

    const sidebar = document.createElement("nav");
    sidebar.className = "side";
    sidebar.innerHTML = `
        <ul style="font-size: 30px;">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="settings.html">Settings</a></li>
        </ul>
    `;

    mainContent.parentNode.insertBefore(contentWrapper, mainContent);
    contentWrapper.appendChild(sidebar);
    contentWrapper.appendChild(mainContent);
});