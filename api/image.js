export default async function handler(req, res) {
    // صرف POST ریکوئسٹ کو اجازت دیں
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { prompt } = req.body;

        // Pollinations AI کے ذریعے امیج کا یو آر ایل (URL) تیار کرنا
        const imageUrl =
            "https://image.pollinations.ai/prompt/" +
            encodeURIComponent(prompt);

        // فرنٹ اینڈ کو امیج کا لنک بھیجنا
        return res.status(200).json({
            image: imageUrl
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}