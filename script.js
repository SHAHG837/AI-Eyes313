async function askAI() {
    const prompt = document.getElementById("prompt").value;
    const responseElement = document.getElementById("response");

    if (!prompt.trim()) {
        responseElement.innerText = "براہِ کرم کوئی سوال لکھیں۔";
        return;
    }

    responseElement.innerText = "🤔 AI سوچ رہا ہے...";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        responseElement.innerText =
            data.answer || data.error || "کوئی جواب نہیں ملا۔";
    } catch (error) {
        responseElement.innerText =
            "Error: " + error.message;
    }
}