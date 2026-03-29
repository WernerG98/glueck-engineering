const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { subject, name, email, phone, message } = req.body || {};

    if (!subject || !name || !email || !message) {
      return res.status(400).json({
        error: "Bitte Betreff, Name, E-Mail und Nachricht ausfüllen.",
      });
    }

    const safeSubject = escapeHtml(subject);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "-");
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["info@glueckengineering.com"],
      reply_to: email,
      subject: `Anfrage: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>Neue Anfrage über die Website</h2>
          <p><strong>Bereich:</strong> ${safeSubject}</p>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>E-Mail:</strong> ${safeEmail}</p>
          <p><strong>Telefon:</strong> ${safePhone}</p>
          <hr style="margin: 24px 0;" />
          <p><strong>Nachricht:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    });

    if (result.error) {
      return res.status(500).json({
        error: result.error.message || "Versand fehlgeschlagen.",
      });
    }

    return res.status(200).json({
      success: true,
      id: result.data?.id || null,
    });
  } catch (err) {
    return res.status(500).json({
      error: err && err.message ? err.message : "Unbekannter Serverfehler",
    });
  }
};
