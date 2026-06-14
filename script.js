// 🤖 CHATBOT (Gemini already working)
async function askAI() {
    const prompt = document.getElementById("prompt").value;
    const response = document.getElementById("response");

    response.innerText = "Thinking...";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();
        response.innerText = data.answer;
    } catch (err) {
        response.innerText = "Error: " + err.message;
    }
}


// 🎨 IMAGE GENERATOR (Mock + API Ready)
async function generateImage() {
    const prompt = document.getElementById("imgPrompt").value;
    const img = document.getElementById("resultImage");
    const status = document.getElementById("imgStatus");

    if (!prompt) {
        status.innerText = "Please write prompt";
        return;
    }

    status.innerText = "Generating image...";

    // ⚠️ Demo Image (placeholder)
    setTimeout(() => {
        img.src = "https://via.placeholder.com/512x512.png?text=" + encodeURIComponent(prompt);
        status.innerText = "Image generated (Demo Mode)";
    }, 1500);
}