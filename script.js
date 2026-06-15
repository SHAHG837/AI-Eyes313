// 🤖 1. GEMINI CHAT ENGINE
async function askAI() {
    const promptValue = document.getElementById("prompt").value;
    const responseElement = document.getElementById("response");

    if (!promptValue) {
        responseElement.innerText = "Please write or speak something first...";
        return;
    }

    responseElement.innerText = "AI سوچ رہا ہے... 🤖";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: promptValue })
        });
        
        if (!res.ok) throw new Error("Chat engine server error");
        
        const data = await res.json();
        responseElement.innerText = data.answer || "No response received.";
    } catch (err) {
        responseElement.innerText = "Error: " + err.message;
    }
}

// 🎨 2. ULTRA-HD IMAGE GENERATOR ENGINE
async function generateImage() {
    const promptValue = document.getElementById("imgPrompt").value;
    const imgElement = document.getElementById("resultImage");
    const statusElement = document.getElementById("imgStatus");

    if (!promptValue) {
        statusElement.innerText = "Please provide a prompt via typing or voice!";
        return;
    }

    statusElement.innerText = "Injecting HD Engines & Generating... Please wait 🚀";
    imgElement.style.display = "none"; 

    try {
        // ✨ AUTO-HD PROMPT ENGINEERING: تصویر کو خودکار الٹرا ریئلسٹک بنانے کے لیے کمنٹس انجکشن
        const hdEnhancers = ", photorealistic, 8k resolution, highly detailed, cinematic lighting, masterpiece, sharp focus";
        const combinedPrompt = promptValue.trim() + hdEnhancers;
        
        // محفوظ یو آر ایل انکوڈنگ
        const cleanPrompt = encodeURIComponent(combinedPrompt);
        
        // کیشے بریکر بیج (Cache Buster Seed)
        const randomSeed = Math.floor(Math.random() * 999999);
        
        // فائنل یو آر ایل تعمیر
        const directImageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=512&height=512&nologo=true&seed=${randomSeed}`;

        console.log("Fired HD URL:", directImageUrl);

        // کلائنٹ سائیڈ انجکشن
        imgElement.src = directImageUrl;

        // آن لوڈ ہینڈلر (جب بائٹس ڈاؤن لوڈ ہو جائیں)
        imgElement.onload = function() {
            imgElement.style.display = "block";
            statusElement.innerText = "Ultra-HD Image generated successfully! 🎉";
        };

        // ایرر کیچنگ
        imgElement.onerror = function() {
            statusElement.innerText = "Failed to render image. Try altering the prompt parameters.";
        };

    } catch (err) {
        statusElement.innerText = "Error: " + err.message;
    }
}

// 🎙️ 3. UNIVERSAL WEB SPEECH ENGINE (Talking Option)
function startVoice(targetInputId, statusOutputId) {
    const inputField = document.getElementById(targetInputId);
    const statusField = document.getElementById(statusOutputId);

    // براؤزر کمپیٹیبلٹی چیک کریں
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("Your browser does not support Voice Commands. Please switch to Google Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();
    
    // سمارٹ بائی لنگول سیٹ اپ: یہ انگلش اور اردو مکس کمانڈز آسانی سے کیچ کرے گا
    recognition.lang = 'en-US'; 
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    statusField.innerText = "Listening now... Speak into your microphone 🎙️";

    recognition.start();

    // آواز ملنے پر ایکشن لسٹنر
    recognition.onresult = function(event) {
        const spokenText = event.results[0][0].transcript;
        console.log("Captured Voice Output:", spokenText);
        
        // ٹیکسٹ فیلڈ میں ڈیٹا پٹ کریں
        inputField.value = spokenText;
        statusField.innerText = "Voice captured: '" + spokenText + "'. Press execution button!";
    };

    // نیٹ ورک یا خاموشی کا ایرر ہینڈلر
    recognition.onerror = function(event) {
        statusField.innerText = "Voice processing halted. Error: " + event.error + ". Try again.";
    };
}