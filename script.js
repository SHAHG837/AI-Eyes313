async function generateImage() {
    const prompt = document.getElementById("imgPrompt").value;
    const img = document.getElementById("resultImage");
    const status = document.getElementById("imgStatus");

    if (!prompt) {
        status.innerText = "Please write prompt";
        return;
    }

    status.innerText = "AI image generate ho rahi hai...";

    try {
        const response = await fetch("/api/image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();

        img.src = data.image;
        status.innerText = "Image generated successfully!";
    } catch (error) {
        status.innerText = "Error: " + error.message;
    }
}