import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Methode nicht erlaubt." });
  }

  try {
    const contentType = req.headers["content-type"] || "";

    if (!contentType.includes("multipart/form-data")) {
      return res.status(400).json({ error: "Ungültiger Request-Typ." });
    }

    const bodyBuffer = await readRequestBody(req);

    const request = new Request("http://localhost", {
      method: "POST",
      headers: {
        "content-type": contentType,
      },
      body: bodyBuffer,
      duplex: "half",
    });

    const formData = await request.formData();

    const subject = String(formData.get("subject") || "Neue Anfrage");
    const type = String(formData.get("type") || "");
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const notes = String(formData.get("notes") || "");

    const quantity = String(formData.get("quantity") || "");

    const artworkColorMode = String(formData.get("artworkColorMode") || "");
    const artworkWidth = String(formData.get("artworkWidth") || "");
    const artworkHeight = String(formData.get("artworkHeight") || "");
    const artworkFrame = String(formData.get("artworkFrame") || "");
    const artworkFrameColor = String(formData.get("artworkFrameColor") || "");
    const artworkQuantity = String(formData.get("artworkQuantity") || "");

    const serviceWhat = String(formData.get("serviceWhat") || "");
    const serviceMaterial = String(formData.get("serviceMaterial") || "");
    const serviceApplication = String(formData.get("serviceApplication") || "");
    const serviceQuantity = String(formData.get("serviceQuantity") || "");

    const file = formData.get("attachment");

    if (!name.trim() || !email.trim()) {
      return res.status(400).json({
        error: "Name und E-Mail sind Pflichtfelder.",
      });
    }

    let text = `Neue Anfrage über die Website

Betreff: ${subject}
Typ: ${type}

Kontaktdaten
Name: ${name}
E-Mail: ${email}
Telefon: ${phone || "-"}

`;

    if (type === "product") {
      if (!quantity.trim()) {
        return res.status(400).json({
          error: "Bitte die Anzahl angeben.",
        });
      }

      text += `Produktanfrage
Produkt: ${subject}
Anzahl: ${quantity}
Weitere Informationen: ${notes || "-"}
`;
    } else if (type === "custom") {
      if (
        !artworkColorMode.trim() ||
        !artworkWidth.trim() ||
        !artworkHeight.trim() ||
        !artworkFrame.trim() ||
        !artworkQuantity.trim()
      ) {
        return res.status(400).json({
          error: "Bitte alle Pflichtfelder für das individuelle 3D-Artwork ausfüllen.",
        });
      }

      if (artworkFrame === "Ja" && !artworkFrameColor.trim()) {
        return res.status(400).json({
          error: "Bitte eine Rahmenfarbe auswählen.",
        });
      }

      text += `Individuelles 3D-Artwork
Ausführung: ${artworkColorMode}
Abmessungen: ${artworkWidth} cm × ${artworkHeight} cm
Rahmen gewünscht: ${artworkFrame}
Rahmenfarbe: ${artworkFrame === "Ja" ? artworkFrameColor : "-"}
Anzahl: ${artworkQuantity}
Motiv / Hinweise: ${notes || "-"}
`;
    } else if (type === "service") {
      if (
        !serviceWhat.trim() ||
        !serviceMaterial.trim() ||
        !serviceApplication.trim()
      ) {
        return res.status(400).json({
          error: "Bitte alle Pflichtfelder für die 3D-Druck Dienstleistung ausfüllen.",
        });
      }

      text += `3D-Druck Dienstleistung
Was soll gedruckt werden: ${serviceWhat}
Gewünschtes Material: ${serviceMaterial}
Einsatzbereich: ${serviceApplication}
Anzahl: ${serviceQuantity || "-"}
Weitere Informationen: ${notes || "-"}
`;
    } else {
      text += `Allgemeine Anfrage
Nachricht: ${notes || "-"}
`;
    }

    const emailPayload = {
      from: "Glück Engineering <onboarding@resend.dev>",
      to: ["info@glueckengineering.com"],
      reply_to: email,
      subject: `Neue Anfrage: ${subject}`,
      text,
    };

    if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
      const maxFileSize = 10 * 1024 * 1024;

      if (file.size > maxFileSize) {
        return res.status(400).json({
          error: "Die angehängte Datei ist zu groß. Maximal 10 MB sind erlaubt.",
        });
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      emailPayload.attachments = [
        {
          filename: file.name,
          content: buffer.toString("base64"),
        },
      ];
    }

    await resend.emails.send(emailPayload);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("CONTACT_API_ERROR", error);
    return res.status(500).json({
      error: "Beim Versand ist ein Fehler aufgetreten.",
    });
  }
}
