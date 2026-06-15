export default async function handler(req, res) {
    // صرف POST ریکوئسٹ کو اندر آنے دیں
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // پرامپٹ کو صاف اور انکوڈ کریں
        const cleanPrompt = encodeURIComponent(prompt.trim());
        const targetUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=512&height=512&nologo=true`;

        // پولینیشنز سرور کو ہٹ کریں
        const response = await fetch(targetUrl);
        
        if (!response.ok) {
            return res.status(502).json({ error: "Pollinations AI integration failed" });
        }

        // 🚨 فول پروف طریقہ: تصویر کے ڈیٹا کو بلاک بائی بلاک (Chunks) جمع کرنا
        const blob = await response.blob();
        const buffer = Buffer.from(await blob.arrayBuffer());

        // براؤزر کو بتائیں کہ جے ایس او این نہیں، جے پی ای جی امیج آ رہی ہے
        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        
        // بفر ڈیٹا سینڈ کریں
        return res.status(200).send(buffer);

    } catch (error) {
        // اگر کوئی بھی مسئلہ ہو تو فرنٹ اینڈ کو صاف ایرر میسج جائے
        return res.status(500).json({ error: error.message });
    }
}