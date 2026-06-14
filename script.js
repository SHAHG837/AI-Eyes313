// =========================
// 🤖 AI CHATBOT FUNCTION
// =========================
async function askAI() {
    const prompt = document.getElementById("prompt").value;
    const responseBox = document.getElementById("response");

    if (!prompt) {
        responseBox.innerText = "Please write something...";
        return;
    }

    responseBox.innerText = "AI سوچ رہا ہے... 🤖";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();

        responseBox.innerText = data.answer || "No response from AI";
    } catch (error) {
        responseBox.innerText = "Error: " + error.message;
    }
}


// =========================
// 🎨 IMAGE GENERATOR
// =========================
async function generateImage() {
    const prompt = document.getElementById("imgPrompt").value;
    const img = document.getElementById("resultImage");
    const status = document.getElementById("imgStatus");

    if (!prompt) {
        status.innerText = "Please write prompt";
        return;
    }

    status.innerText = "Generating image...";

    try {
        const res = await fetch("/api/image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();

        if (data.image) {
            img.src = data.image;
            status.innerText = "Image generated successfully!";
        } else {
            status.innerText = "No image received";
        }

    } catch (error) {
        status.innerText = "Error: " + error.message;
    }
}