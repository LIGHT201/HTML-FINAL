const updateData = [
    { date: "2026-06-14", content: "Added app.js" },
    { date: "2026-06-14", content: "Added settings.js" },
    { date: "2026-06-14", content: "Added updates.js" },
    { date: "2026-06-14", content: "Added layout.js" },
   
];

let currentPage = 1;
const itemsPerPage = 3;

function renderUpdates() {
    const tableBody = document.querySelector("#updates-table tbody");
    if (!tableBody) return;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = updateData.slice(start, end);

    tableBody.innerHTML = pageItems.map(item => `
        <tr>
            <td>${item.date}</td>
            <td>${item.content}</td>
        </tr>
    `).join('');

    renderPaginationControls();
}

function renderPaginationControls() {
    const container = document.getElementById("pagination-controls");
    if (!container) return;

    const pageCount = Math.ceil(updateData.length / itemsPerPage);
    container.innerHTML = `
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)">Prev</button>
        <span>Page ${currentPage} of ${pageCount}</span>
        <button ${currentPage === pageCount ? 'disabled' : ''} onclick="changePage(1)">Next</button>
    `;
}

window.changePage = (direction) => {
    currentPage += direction;
    renderUpdates();
};

document.addEventListener("DOMContentLoaded", renderUpdates);