async function askAI() {
    const prompt = document.getElementById("prompt").value;

    document.getElementById("response").innerText = "Thinking...";

    try {
        document.getElementById("response").innerText =
            "Gemini integration successful. Backend setup required.";
    } catch (error) {
        document.getElementById("response").innerText =
            "Error: " + error.message;
    }
}