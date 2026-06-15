document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("feedback-form");
    const responseBox = document.getElementById("feedback-response");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const enjoyed = form.querySelector('input[name="enjoyed"]:checked').value;
        const suggestions = document.getElementById('suggestions').value;

        responseBox.style.display = "block";
        responseBox.innerHTML = `
            <h3>Feedback Received!</h3>
            
        `;
        form.reset();
    });
});