// 🤖 CHATBOT
async function askAI() {
    const prompt = document.getElementById("prompt").value;
    const response = document.getElementById("response");

    if (!prompt) {
        response.innerText = "Please write something...";
        return;
    }

    response.innerText = "AI سوچ رہا ہے... 🤖";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();

        response.innerText = data.answer || "No response";
    } catch (err) {
        response.innerText = "Error: " + err.message;
    }
}


// 🎨 IMAGE GENERATOR (FIXED REAL SHOW IMAGE)
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

        console.log(data);

        if (data.image) {
            img.src = data.image;
            img.onload = () => {
                status.innerText = "Image generated successfully!";
            };
        } else {
            status.innerText = "No image received";
        }

    } catch (err) {
        status.innerText = "Error: " + err.message;
    }
}