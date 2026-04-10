import { Resend } from "resend";

export const config = {
  api: {
    bodyParser: false,
  },
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function readFormData(req) {
  if (typeof req.formData === "function") {
    return req.formData();
  }

  const { IncomingForm } = await import("formidable");

  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ keepExtensions: true, multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        get(name) {
          const value = fields[name];
          if (Array.isArray(value)) return value[0];
          if (value !== undefined) return value;
          return files[name] || null;
        },
      });
    });
  });
}

function buildHtmlTable(rows) {
  return rows
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border:1px solid #ddd;vertical-align:top;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Methode nicht erlaubt." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Glueck Engineering <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return res.status(500).json({
      error: "Server-Konfiguration unvollständig. Bitte RESEND_API_KEY und CONTACT_TO_EMAIL setzen.",
    });
  }

  try {
    const form = await readFormData(req);

    const subject = form.get("subject") || "Allgemeine Anfrage";
    const type = form.get("type") || "general";
    const name = form.get("name") || "";
    const email = form.get("email") || "";
    const phone = form.get("phone") || "";
    const notes = form.get("notes") || "";
    const quantity = form.get("quantity") || "";
    const artworkColorMode = form.get("artworkColorMode") || "";
    const artworkWidth = form.get("artworkWidth") || "";
    const artworkHeight = form.get("artworkHeight") || "";
    const artworkFrame = form.get("artworkFrame") || "";
    const artworkFrameColor = form.get("artworkFrameColor") || "";
    const artworkQuantity = form.get("artworkQuantity") || "";
    const serviceMaterial = form.get("serviceMaterial") || "";
    const serviceApplication = form.get("serviceApplication") || "";
    const serviceQuantity = form.get("serviceQuantity") || "";

    const commonRows = [
      ["Anfragetyp", type],
      ["Name", name],
      ["E-Mail", email],
      ["Telefon", phone],
    ];

    let specificRows = [];

    if (type === "product") {
      specificRows = [
        ["Produkt", subject],
        ["Anzahl", quantity],
        ["Hinweise", notes],
      ];
    } else if (type === "custom") {
      specificRows = [
        ["Anfrage", subject],
        ["Ausführung", artworkColorMode],
        ["Breite in cm", artworkWidth],
        ["Höhe in cm", artworkHeight],
        ["Rahmen gewünscht", artworkFrame],
        ["Rahmenfarbe", artworkFrameColor],
        ["Anzahl", artworkQuantity],
        ["Hinweise", notes],
      ];
    } else if (type === "service") {
      specificRows = [
        ["Anfrage", subject],
        ["Material", serviceMaterial],
        ["Einsatzbereich", serviceApplication],
        ["Anzahl", serviceQuantity],
        ["Hinweise", notes],
      ];
    } else {
      specificRows = [
        ["Anfrage", subject],
        ["Nachricht", notes],
      ];
    }

    const html = `
      <div style="font-family:Arial,sans-serif;color:#111;">
        <h2>Neue Anfrage über Glueck Engineering</h2>
        <table style="border-collapse:collapse;width:100%;max-width:800px;">
          ${buildHtmlTable([...commonRows, ...specificRows])}
        </table>
      </div>`;

    const textRows = [...commonRows, ...specificRows]
      .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      reply_to: email || undefined,
      subject: `Neue Anfrage: ${subject}`,
      html,
      text: textRows,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Beim Versand ist ein Fehler aufgetreten." });
  }
}
