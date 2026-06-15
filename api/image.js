export default async function handler(req, res) {
    // صرف POST ریکوئسٹ کو اجازت دیں
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Step 1: پرامپٹ کو یو آر ایل فرینڈلی بنائیں (Spaces کو %20 میں بدلتا ہے)
        const cleanPrompt = encodeURIComponent(prompt.trim());
        const targetUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=512&height=512&nologo=true`;

        // Step 2: ورسیل سرور خود پولینیشنز سرور سے تصویر ڈاؤن لوڈ کرے گا
        const imageResponse = await fetch(targetUrl);
        
        if (!imageResponse.ok) {
            throw new Error("Failed to fetch image from Pollinations AI");
        }

        // Step 3: تصویر کو بائنری ڈیٹا (ArrayBuffer) میں تبدیل کریں
        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Step 4: براؤزر کو بتائیں کہ یہ کوئی ٹیکسٹ یا جے ایس او این نہیں بلکہ تصویر ہے
        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        
        // Step 5: تصویر کا بفر فرنٹ اینڈ کو بھیج دیں
        return res.status(200).send(buffer);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}