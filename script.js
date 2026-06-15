async function generateImage() {
    const promptValue = document.getElementById("imgPrompt").value;
    const imgElement = document.getElementById("resultImage");
    const statusElement = document.getElementById("imgStatus");

    if (!promptValue) {
        statusElement.innerText = "Please write a prompt!";
        return;
    }

    // لوڈنگ اسٹیٹس سیٹ کریں اور پرانی تصویر چھپائیں
    statusElement.innerText = "Generating image... Please wait 🚀";
    imgElement.style.display = "none";

    try {
        // بیک اینڈ پروکسی کو ہٹ کریں جہاں سے بائنری ڈیٹا (Blob) آنا ہے
        const response = await fetch("/api/image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: promptValue })
        });

        if (!response.ok) {
            throw new Error("Server returned an error");
        }

        // بائنری ڈیٹا کو براؤزر کے پڑھنے کے لائق لوکل یو آر ایل (Blob URL) میں بدلیں
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);

        // تصویر کا سورس سیٹ کریں
        imgElement.src = objectURL;
        
        // جب تصویر پوری طرح لوڈ ہو جائے تو اسکرین پر شو کریں
        imgElement.onload = function() {
            imgElement.style.display = "block";
            statusElement.innerText = "Image generated successfully! 🎉";
        };

    } catch (err) {
        statusElement.innerText = "Error: " + err.message + ". Please try again.";
    }
}