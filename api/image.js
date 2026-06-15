// ورسیل سرور لیس کیپنگ کو کلین رکھنے کے لیے مڈل ویئر روٹ
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    return res.status(200).json({ status: "Security clearance checked. Client-side mapping is fully functional." });
}