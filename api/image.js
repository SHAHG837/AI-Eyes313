export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt required" });
        }

        // ⚠️ Demo AI Image (Next step: real AI API)
        const imageUrl =
            "https://image.pollinations.ai/prompt/" +
            encodeURIComponent(prompt);

        return res.status(200).json({
            image: imageUrl
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}