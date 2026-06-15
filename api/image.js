// یہ روٹ اب فرنٹ اینڈ کو بوجھ سے بچانے کے لیے بالکل کلین اور محفوظ رکھا گیا ہے
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    return res.status(200).json({ status: "Image backend engine is clean and optimized." });
}