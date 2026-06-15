// 🤖 1. CHATBOT FUNCTION (جیمنائی چیٹ کے لیے)
async function askAI() {
    const promptValue = document.getElementById("prompt").value;
    const responseElement = document.getElementById("response");

    if (!promptValue) {
        responseElement.innerText = "Please write something...";
        return;
    }

    responseElement.innerText = "AI سوچ رہا ہے... 🤖";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: promptValue })
        });
        const data = await res.json();
        responseElement.innerText = data.answer || "No response";
    } catch (err) {
        responseElement.innerText = "Error: " + err.message;
    }
}

// 🎨 2. IMAGE GENERATOR FUNCTION (پولینیشنز امیج فکس)
async function generateImage() {
    const promptValue = document.getElementById("imgPrompt").value;
    const imgElement = document.getElementById("resultImage");
    const statusElement = document.getElementById("imgStatus");

    if (!promptValue) {
        statusElement.innerText = "Please write a prompt!";
        return;
    }

    statusElement.innerText = "Generating image... Please wait 🚀";
    imgElement.style.display = "none"; // نئی تصویر بننے تک پرانی تصویر کو سکرین سے غائب کر دیں

    try {
        const res = await fetch("/api/image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: promptValue })
        });

        const data = await res.json();
        console.log("Server Response:", data);

        if (data.image) {
            // بیک اینڈ سے آنے والا یو آر ایل امیج کے سورس میں سیٹ کریں
            imgElement.src = data.image;

            // جب براؤزر انٹرنیٹ سے تصویر پوری طرح ڈاؤن لوڈ کر لے، تب اسکرین پر شو کرے
            imgElement.onload = function() {
                imgElement.style.display = "block"; // امیج شو کریں
                statusElement.innerText = "Image generated successfully! 🎉";
            };

            // اگر تصویر کا لنک اوپن ہونے میں کوئی نیٹ ورک کا مسئلہ آئے
            imgElement.onerror = function() {
                statusElement.innerText = "Error loading image resource. Please try again.";
            };

        } else {
            statusElement.innerText = "No image URL returned from backend.";
        }

    } catch (err) {
        statusElement.innerText = "Error: " + err.message;
    }
}