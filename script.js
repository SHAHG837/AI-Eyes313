// 🤖 1. CHATBOT FUNCTION (Gemini API Call via Vercel Backend)
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
        responseElement.innerText = data.answer || "No response received.";
    } catch (err) {
        responseElement.innerText = "Error: " + err.message;
    }
}

// 🎨 2. IMAGE GENERATOR FUNCTION (Direct Secure Client-Side Injector)
async function generateImage() {
    const promptValue = document.getElementById("imgPrompt").value;
    const imgElement = document.getElementById("resultImage");
    const statusElement = document.getElementById("imgStatus");

    if (!promptValue) {
        statusElement.innerText = "Please write a prompt!";
        return;
    }

    // لوڈنگ اسٹیٹس ایکٹیو کریں اور پرانی تصویر غائب کریں
    statusElement.innerText = "Generating image... Please wait 🚀";
    imgElement.style.display = "none"; 

    try {
        // پرامپٹ کو یو آر ایل فارمیٹ کے مطابق محفوظ طریقے سے انکوڈ کریں
        const cleanPrompt = encodeURIComponent(promptValue.trim());
        
        // کیشے بلاکنگ (Cache Busting) کے لیے رینڈم نمبر جنریٹ کریں تاکہ ہر بار نئی تصویر بنے
        const randomSeed = Math.floor(Math.random() * 999999);
        
        // ڈائریکٹ لنک جوڑیں
        const directImageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=512&height=512&nologo=true&seed=${randomSeed}`;

        console.log("Requesting URL:", directImageUrl);

        // براؤزر کے امیج ٹیگ کو ڈائریکٹ سورس الائن کریں
        imgElement.src = directImageUrl;

        // جب تصویر انٹرنیٹ سے مکمل ڈاؤن لوڈ ہو جائے
        imgElement.onload = function() {
            imgElement.style.display = "block"; // امیج شو کریں
            statusElement.innerText = "Image generated successfully! 🎉";
        };

        // نیٹ ورک ٹائم آؤٹ یا فیل ڈاون لوڈنگ ہینڈلر
        imgElement.onerror = function() {
            statusElement.innerText = "Error loading image from AI Engine. Please try again with a different prompt.";
        };

    } catch (err) {
        statusElement.innerText = "Error: " + err.message;
    }
}