// 🤖 1. چیٹ بوٹ فنکشن (جیمنائی کے لیے)
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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: promptValue })
        });

        const data = await res.json();
        responseElement.innerText = data.answer || "No response";

    } catch (err) {
        responseElement.innerText = "Error: " + err.message;
    }
}


// 🎨 2. امیج جنریٹر فنکشن (پولینیشنز کے لیے - 100٪ فکسڈ)
async function generateImage() {
    const promptValue = document.getElementById("imgPrompt").value;
    const imgElement = document.getElementById("resultImage");
    const statusElement = document.getElementById("imgStatus");

    if (!promptValue) {
        statusElement.innerText = "Please write a prompt!";
        return;
    }

    statusElement.innerText = "Generating image... Please wait 🚀";
    imgElement.style.display = "none"; // نئی تصویر بننے تک پرانی تصویر چھپا دیں

    try {
        const res = await fetch("/api/image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: promptValue })
        });

        const data = await res.json();
        console.log("Backend Response:", data);

        if (data.image) {
            // 🖼️ تصویر کا لنک امیج ٹیگ کے 'src' میں ڈالیں
            imgElement.src = data.image;

            // جب تصویر انٹرنیٹ سے مکمل ڈاؤن لوڈ ہو جائے، تبھی اسکرین پر شو ہو
            imgElement.onload = () => {
                imgElement.style.display = "block"; // تصویر شو کریں
                statusElement.innerText = "Image generated successfully! 🎉";
            };
        } else {
            statusElement.innerText = "No image received from backend.";
        }

    } catch (err) {
        statusElement.innerText = "Error: " + err.message;
    }
}