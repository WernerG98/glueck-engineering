import { useState } from "react";

export default function GlueckEngineeringWebsite() {
  const contactEmail = "info@glueckengineering.com";

  const fertigteile = [
    {
      name: "Führung für Blende / unterer Kühlergrill VW T4 (langer Vorderwagen)",
      imageType: "comingSoon",
      text: "Passgenaue Führung für den unteren Kühlergrill des VW T4 mit langem Vorderwagen.",
    },
  ];

  const galleryImages = [
    "/Artwork_Stanced_E46.png",
    "/Artwork_Stanced_E46_5.png",
    "/Artwork_Stanced_E46_6.png",
    "/Artwork_E87.png",
    "/Artwork_Foggy_Mountains.png",
    "/Artwork_Wave.png",
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [requestSubject, setRequestSubject] = useState("");
  const [requestType, setRequestType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const openContactModal = (subject, type) => {
    setRequestSubject(subject);
    setRequestType(type);

    let defaultMessage = "";

    if (type === "product") {
      defaultMessage = `Ich interessiere mich für folgendes Fertigteil:
${subject}

Weitere Informationen:`;
    }

    if (type === "custom") {
      defaultMessage = `Ich interessiere mich für ein individuelles 3D-Artwork.

Bitte folgende Informationen angeben:
- Schwarz-Weiß oder in Farbe
- Abmessungen
- Rahmen gewünscht / nicht gewünscht
- Rahmenfarbe
- Anzahl

Motiv / Hinweise:`;
    }

    if (type === "service") {
      defaultMessage = `Ich interessiere mich für eine individuelle 3D-Druck Dienstleistung.

Bitte folgende Informationen angeben:
- Was soll gedruckt werden?
- Gewünschtes Material
- Einsatzbereich
- Weitere Informationen`;
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: defaultMessage,
    });

    setContactModalOpen(true);
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitContactForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Bitte Name, E-Mail und Nachricht ausfüllen.");
      return;
    }

    const body = `Hallo,

${formData.message}

Kontaktdaten:
Name: ${formData.name}
E-Mail: ${formData.email}
Telefon: ${formData.phone || "-"}

Viele Grüße`;

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      `Anfrage: ${requestSubject}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const contactLink = `mailto:${contactEmail}`;

  const renderFertigteilVisual = (item) => {
    if (item.imageType === "comingSoon") {
      return (
        <div className="flex h-full w-full items-center justify-center bg-neutral-950">
          <span className="text-lg font-semibold uppercase tracking-[0.2em] text-white">
            Coming soon
          </span>
        </div>
      );
    }

    return (
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover"
      />
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-6">
            <img
              src="/logo.png"
              alt="Glück Engineering Logo"
              className="h-36 w-36 object-contain"
            />
            <span className="text-2xl font-semibold md:text-3xl">
              Glück Engineering
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-20">
        <section>
          <h1 className="text-4xl font-semibold md:text-6xl">
            Teile, die funktionieren.
            <br />
            Designs, die auffallen.
          </h1>

          <p className="mt-6 max-w-2xl text-neutral-400">
            Individuelle Fertigteile, 3D-Artworks und technische
            3D-Drucklösungen aus einer Hand.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="mb-8 text-2xl font-semibold">Fertigteile</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fertigteile.map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl border border-white/10 bg-neutral-900 p-6"
              >
                <div className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-neutral-950">
                  {renderFertigteilVisual(item)}
                </div>

                <h3 className="mt-4 text-lg">{item.name}</h3>
                <p className="mt-2 text-sm text-neutral-400">{item.text}</p>

                <button
                  onClick={() => openContactModal(item.name, "product")}
                  className="mt-6 rounded-xl bg-neutral-700 py-3 text-center transition hover:bg-neutral-600"
                >
                  Anfrage senden
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <div className="grid gap-8 rounded-2xl border border-white/10 bg-neutral-900 p-10 md:grid-cols-2 md:items-center">
            <div className="text-left">
              <h2 className="text-2xl font-semibold">
                Individuelles 3D-Bild aus deinem Motiv
              </h2>

              <p className="mt-4 text-neutral-400">
                Wir verwandeln dein Motiv in ein mehrschichtiges 3D-Artwork mit
                klarer Tiefenwirkung. Möglich sind sowohl schwarz-weiße
                Ausführungen als auch mehrfarbige Varianten mit bis zu sechs
                Farben.
                <br />
                <br />
                Maximale Bauteilgröße: 33 × 32,5 × 32 cm.
                <br />
                Preise ab 19,99 € für Schwarz-Weiß beziehungsweise ab 29,99 € für
                mehrfarbige Ausführungen.
                <br />
                <br />
                Sende uns dein Bild einfach per E-Mail. Mit der Übermittlung
                bestätigst du, dass du über die erforderlichen Nutzungsrechte am
                Motiv verfügst.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() =>
                    openContactModal("Individuelles 3D-Artwork", "custom")
                  }
                  className="inline-block rounded-xl bg-neutral-700 px-6 py-3 transition hover:bg-neutral-600"
                >
                  Anfrage senden
                </button>

                <a
                  href="#ablauf-artworks"
                  className="inline-block rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5"
                >
                  Zum Ablauf
                </a>

                <a
                  href="#galerie"
                  className="inline-block rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5"
                >
                  Zur Galerie
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/Artwork_Stanced_E46.png"
                alt="3D Artwork BMW E46"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-10 text-center">
            <h2 className="text-2xl font-semibold">3D-Druck Dienstleistung</h2>

            <p className="mt-4 max-w-2xl mx-auto text-neutral-400">
              Wir bieten individuelle 3D-Drucklösungen für funktionale
              Bauteile, Prototypen und Sonderanfertigungen.
              <br />
              <br />
              Verfügbare Materialien sind unter anderem PLA, PETG, TPU, ABS,
              ASA, PC, PA sowie faserverstärkte Varianten, beispielsweise mit
              Carbon.
              <br />
              <br />
              Maximale Bauteilgröße: 33 × 32,5 × 32 cm.
              <br />
              <br />
              Sende uns deine Anfrage einfach per E-Mail mit allen relevanten
              Informationen zu Bauteil, Material und Einsatzbereich.
            </p>

            <button
              onClick={() =>
                openContactModal("3D-Druck Dienstleistung", "service")
              }
              className="mt-8 inline-block rounded-xl bg-neutral-700 px-6 py-3 transition hover:bg-neutral-600"
            >
              Anfrage senden
            </button>
          </div>
        </section>

        <section id="ablauf-artworks" className="mt-24">
          <h2 className="mb-8 text-2xl font-semibold">
            Ablauf für individuelle 3D-Artworks
          </h2>

          <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-lg font-semibold">
                1
              </div>
              <h3 className="text-xl font-semibold">
                Du sendest uns dein Bild und deine Wünsche
              </h3>
              <p className="mt-3 text-neutral-400">
                Sende uns dein Motiv als JPG, PNG, WEBP oder SVG per E-Mail und
                teile uns folgende Informationen mit:
              </p>
              <div className="mt-4 space-y-2 text-neutral-300">
                <p>• Schwarz-Weiß oder in Farbe</p>
                <p>• Gewünschte Abmessungen</p>
                <p>• Rahmen gewünscht oder nicht</p>
                <p>• Gewünschte Rahmenfarbe</p>
                <p>• Anzahl</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-lg font-semibold">
                2
              </div>
              <h3 className="text-xl font-semibold">
                Wir prüfen deine Angaben und erstellen einen Vorabentwurf
              </h3>
              <p className="mt-3 text-neutral-400">
                Auf Basis deiner Angaben prüfen wir die Umsetzbarkeit und senden
                dir vor dem Druck einen Vorabentwurf inklusive Preis zu. So
                siehst du bereits vorab, wie das spätere Artwork aussehen wird.
              </p>

              <div className="mt-6 flex justify-center">
                <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src="/Artwork_Kein_Leben_bleibt.png"
                    alt="Vorabentwurf des Artworks"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-lg font-semibold">
                3
              </div>
              <h3 className="text-xl font-semibold">
                Du gibst das Angebot frei
              </h3>
              <p className="mt-3 text-neutral-400">
                Erst wenn du mit Entwurf und Preis einverstanden bist,
                bestätigst du das Angebot. Vorher wird nichts produziert.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-lg font-semibold">
                4
              </div>
              <h3 className="text-xl font-semibold">
                Wir fertigen dein Artwork und verschicken es
              </h3>
              <p className="mt-3 text-neutral-400">
                Nach deiner Freigabe fertigen wir das Produkt und versenden es
                anschließend sorgfältig verpackt an dich.
              </p>

              <div className="mt-6 flex justify-center">
                <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src="/Artwork_Kein_Leben_bleibt_Ergebnis.jpg"
                    alt="Fertig gedrucktes Artwork"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="galerie" className="mt-24">
          <h2 className="mb-8 text-2xl font-semibold">Galerie</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className="aspect-square overflow-hidden rounded-2xl border border-white/10 transition hover:border-white/20"
              >
                <img
                  src={image}
                  alt={`Galeriebild ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-neutral-500 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Glück Engineering Logo"
              className="h-16 w-16 object-contain"
            />
            <span>© Glück Engineering</span>
          </div>

          <a href={contactLink} className="text-sm hover:text-white">
            {contactEmail}
          </a>
        </div>
      </footer>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center px-4 py-8"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Vollansicht"
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
          />
        </div>
      )}

      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-neutral-900 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{requestSubject}</h2>
              <button
                onClick={closeContactModal}
                className="rounded-lg px-3 py-2 text-neutral-400 transition hover:bg-white/5 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name *"
                className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E-Mail *"
                className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Telefon (optional)"
                className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={10}
                placeholder="Deine Nachricht *"
                className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-4">
              <button
                onClick={closeContactModal}
                className="rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5"
              >
                Abbrechen
              </button>

              <button
                onClick={submitContactForm}
                className="rounded-xl bg-neutral-700 px-6 py-3 transition hover:bg-neutral-600"
              >
                E-Mail vorbereiten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
