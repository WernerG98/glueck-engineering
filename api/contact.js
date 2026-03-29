import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, message, subject } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, E-Mail und Nachricht sind Pflicht",
      });
    }

    const result = await resend.emails.send({
      from: "onboarding@resend.dev", // später ändern!
      to: ["info@glueckengineering.com"],
      reply_to: email,
      subject: subject || "Neue Anfrage",
      html: `
        <h2>Neue Anfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "-"}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message}</p>
      `,
    });

    // 🔥 WICHTIG: prüfen ob wirklich gesendet wurde
    if (result.error) {
      console.error("RESEND ERROR:", result.error);
      return res.status(500).json({ error: result.error.message });
    }

    console.log("MAIL SENT:", result);

    return res.status(200).json({
      success: true,
      id: result.data?.id,
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);

    return res.status(500).json({
      error: err.message || "Unbekannter Fehler",
    });
  }
}