export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // سپیس اور خاص حروف کو یو آر ایل فرینڈلی بنانے کے لیے انکوڈنگ کا پکا طریقہ
        const cleanPrompt = encodeURIComponent(prompt.trim());
        const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=512&height=512&nologo=true`;

        // فرنٹ اینڈ کو ڈائریکٹ صاف ستھرا امیج لنک بھیجیں
        return res.status(200).json({ image: imageUrl });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}