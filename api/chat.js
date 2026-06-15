export default async function handler(req, res) {
    // صرف POST ریکوئسٹ کو اجازت دیں
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { prompt } = req.body;

        // گوگل جیمنائی 2.5 فلیش ماڈل کو کال کرنا
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
            process.env.GEMINI_API_KEY,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        // گوگل کے جواب سے ٹیکسٹ نکالنا
        const answer =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response from AI";

        // فرنٹ اینڈ کو جواب بھیجنا
        return res.status(200).json({ answer });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}