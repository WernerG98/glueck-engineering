import { useState } from "react";

export default function GlueckEngineeringWebsite() {
  const contactEmail = "info@glueckengineering.com";

  const fertigteile = [
    {
      name: "VW T4 Führung für Blende / unterer Kühlergrill R+L (langer Vorderwagen)",
      image: "/Fuehrung_Blende_T4.png",
      price: "19,99 €",
      text: "Passgenaue Führung für den unteren Kühlergrill des VW T4 mit langem Vorderwagen für originale Kotflügel. Bei Nachbau-Kotflügeln sind die Laschen oft höher, die Öffnung im Halter kann einfach angepasst werden.",
    },
    {
      name: "Honda XRV750 RD07 Spritzschutz Schwinge hinten",
      image: "/Honda_XRV_RD07_Spritzschutz_Schwinge_hinten.jpg",
      price: "24,99 €",
      text: "Robuster Spritzschutz für die hintere Schwinge. Gefertigt aus widerstandsfähigem Material mit erhöhter Steifigkeit gegenüber dem Originalbauteil, bleibt jedoch ausreichend flexibel, um Belastungen und Vibrationen im Fahrbetrieb zuverlässig aufzunehmen.",
    },
  ];

  const galleryImages = [
    "/Artwork_Stanced_E46.png",
    "/Artwork_Stanced_E46_5.png",
    "/Artwork_E87.png",
    "/Artwork_Kein_Leben_bleibt.png",
    "/Artwork_Foggy_Mountains.png",
    "/Artwork_Wave.png",
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [requestSubject, setRequestSubject] = useState("");
  const [requestType, setRequestType] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [attachment, setAttachment] = useState(null);

  const initialFormData = {
    name: "",
    email: "",
    phone: "",

    // Allgemein
    notes: "",

    // Produkt
    quantity: "1",

    // Custom Artwork
    artworkColorMode: "",
    artworkWidth: "",
    artworkHeight: "",
    artworkFrame: "",
    artworkFrameColor: "",
    artworkQuantity: "1",

    // Service
    serviceMaterial: "Nach Empfehlung",
    serviceApplication: "",
    serviceQuantity: "1",
  };

  const [formData, setFormData] = useState(initialFormData);

  const openContactModal = (subject, type) => {
    setRequestSubject(subject);
    setRequestType(type);
    setFormData(initialFormData);
    setAttachment(null);
    setContactModalOpen(true);
  };

  const closeContactModal = () => {
    if (isSending) return;
    setContactModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "artworkFrame") {
        return {
          ...prev,
          artworkFrame: value,
          artworkFrameColor: value === "Ja" ? prev.artworkFrameColor : "",
        };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setAttachment(file);
  };

  const submitContactForm = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Bitte Name und E-Mail ausfüllen.");
      return;
    }

    if (requestType === "general" && !formData.notes.trim()) {
      alert("Bitte eine Nachricht eingeben.");
      return;
    }

    if (requestType === "product" && !formData.quantity.trim()) {
      alert("Bitte die Anzahl der benötigten Teile angeben.");
      return;
    }

    if (requestType === "custom") {
      if (
        !formData.artworkColorMode.trim() ||
        !String(formData.artworkWidth).trim() ||
        !String(formData.artworkHeight).trim() ||
        !formData.artworkFrame.trim() ||
        !formData.artworkQuantity.trim()
      ) {
        alert("Bitte alle Pflichtfelder für das individuelle 3D-Artwork ausfüllen.");
        return;
      }

      if (formData.artworkFrame === "Ja" && !formData.artworkFrameColor.trim()) {
        alert("Bitte eine Rahmenfarbe auswählen.");
        return;
      }
    }

    if (requestType === "service") {
      if (
        !formData.serviceMaterial.trim() ||
        !formData.serviceApplication.trim() ||
        !formData.serviceQuantity.trim()
      ) {
        alert("Bitte alle Pflichtfelder für die 3D-Druck Dienstleistung ausfüllen.");
        return;
      }
    }

    try {
      setIsSending(true);

      const body = new FormData();
      body.append("subject", requestSubject);
      body.append("type", requestType);
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("phone", formData.phone);
      body.append("notes", formData.notes);

      body.append("quantity", formData.quantity);

      body.append("artworkColorMode", formData.artworkColorMode);
      body.append("artworkWidth", formData.artworkWidth);
      body.append("artworkHeight", formData.artworkHeight);
      body.append("artworkFrame", formData.artworkFrame);
      body.append("artworkFrameColor", formData.artworkFrameColor);
      body.append("artworkQuantity", formData.artworkQuantity);

      body.append("serviceMaterial", formData.serviceMaterial);
      body.append("serviceApplication", formData.serviceApplication);
      body.append("serviceQuantity", formData.serviceQuantity);

      if (attachment && requestType !== "product" && requestType !== "general") {
        body.append("attachment", attachment);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Versand fehlgeschlagen.");
      }

      alert("Deine Anfrage wurde erfolgreich gesendet.");
      setContactModalOpen(false);
      setFormData(initialFormData);
      setAttachment(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Beim Versand ist ein Fehler aufgetreten.");
    } finally {
      setIsSending(false);
    }
  };

  const contactLink = `mailto:${contactEmail}`;

  const renderFertigteilVisual = (item) => {
    if (item.image) {
      return (
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      );
    }

    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral-950">
        <span className="text-base font-semibold uppercase tracking-[0.2em] text-white sm:text-lg">
          Coming soon
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:py-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <img
              src="/logo.png"
              alt="Glück Engineering Logo"
              className="h-16 w-16 object-contain sm:h-20 sm:w-20 md:h-28 md:w-28"
            />
            <span className="text-xl font-semibold sm:text-2xl md:text-3xl">
              Glück Engineering
            </span>
          </div>

          <button
            onClick={() => openContactModal("Allgemeine Anfrage", "general")}
            className="w-full rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5 md:w-auto"
          >
            Kontakt
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <section>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
            Teile, die funktionieren.
            <br />
            Designs, die auffallen.
          </h1>

          <p className="mt-6 max-w-2xl text-sm text-neutral-400 sm:text-base">
            Individuelle Fertigteile, 3D-Artworks und technische
            3D-Drucklösungen aus einer Hand.
          </p>
        </section>

        <section className="mt-16 sm:mt-20 md:mt-24">
          <h2 className="mb-6 text-2xl font-semibold sm:mb-8">Fertigteile</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fertigteile.map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl border border-white/10 bg-neutral-900 p-5 sm:p-6"
              >
                <div className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-neutral-950">
                  {renderFertigteilVisual(item)}
                </div>

                <h3 className="mt-4 text-base sm:text-lg">{item.name}</h3>
                <p className="mt-2 text-lg font-semibold text-white">{item.price}</p>
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

        <section className="mt-16 sm:mt-20 md:mt-24">
          <div className="grid gap-6 rounded-2xl border border-white/10 bg-neutral-900 p-6 sm:gap-8 sm:p-8 md:grid-cols-2 md:items-center md:p-10">
            <div className="text-left">
              <h2 className="text-2xl font-semibold">
                Individuelles 3D-Bild aus deinem Motiv
              </h2>

              <p className="mt-4 text-sm text-neutral-400 sm:text-base">
                Wir verwandeln dein Motiv in ein mehrschichtiges 3D-Artwork mit ausgeprägter Tiefenwirkung.
                Durch den schichtweisen Druck mit variierender Materialstärke entsteht eine plastische, dreidimensionale Oberfläche.
                Realisierbar sind sowohl schwarz-weiße Ausführungen als auch mehrfarbige Varianten mit bis zu sechs Farben.
                <br />
                <br />
                Maximale Abmessungen: 30 × 30 cm.
                <br />
                Preise ab 19,99 € für Schwarz-Weiß beziehungsweise ab 29,99 €
                (zzgl. Versand) für mehrfarbige Ausführungen.
                <br />
                <br />
                Sende uns dein Bild einfach per Anfrage. Mit der Übermittlung
                bestätigst du, dass du über die erforderlichen Nutzungsrechte am
                Motiv verfügst.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  onClick={() =>
                    openContactModal("Individuelles 3D-Artwork", "custom")
                  }
                  className="inline-block rounded-xl bg-neutral-700 px-6 py-3 text-center transition hover:bg-neutral-600"
                >
                  Anfrage senden
                </button>

                <a
                  href="#ablauf-artworks"
                  className="inline-block rounded-xl border border-white/10 px-6 py-3 text-center transition hover:bg-white/5"
                >
                  Zum Ablauf
                </a>

                <a
                  href="#galerie"
                  className="inline-block rounded-xl border border-white/10 px-6 py-3 text-center transition hover:bg-white/5"
                >
                  Zur Galerie
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/Artwork_Stanced_E46.png"
                alt="3D Artwork BMW E46"
                className="h-64 w-full object-cover sm:h-80 md:h-full"
              />
            </div>
          </div>
        </section>

        <section className="mt-16 sm:mt-20">
          <div className="grid gap-6 rounded-2xl border border-white/10 bg-neutral-900 p-6 sm:gap-8 sm:p-8 md:grid-cols-2 md:items-center md:p-10">
            <div className="text-left">
              <h2 className="text-2xl font-semibold">
                3D-Druck und Dienstleistungen
              </h2>

              <p className="mt-3 text-lg text-white">
                Deine Datei. Dein Bauteil. Wir übernehmen den Rest.
              </p>

              <p className="mt-4 text-sm text-neutral-400 sm:text-base">
                Wir bieten individuelle 3D-Drucklösungen für funktionale
                Bauteile, Prototypen und Kleinserien.
                <br />
                <br />
                Du hast bereits eine fertige Datei? Dann sende uns einfach dein
                Modell, wir übernehmen den Druck und liefern das Bauteil direkt
                zu dir.
                <br />
                <br />
                Alternativ unterstützen wir dich von der Idee bis zum fertigen
                Produkt: von der technischen Beratung über Konstruktion und
                Optimierung bis hin zur fertigen Bauteilproduktion.
                <br />
                <br />
                Neben der reinen Fertigung unterstützen wir bei der Auslegung
                von Bauteilen hinsichtlich mechanischer Belastung,
                Temperaturbeständigkeit und Umgebungsbedingungen wie
                UV-Einwirkung oder Feuchtigkeit.
                <br />
                <br />
                Verfügbare Materialien umfassen unter anderem PLA, PETG, TPU,
                ABS, ASA, PC, PA sowie faserverstärkte Varianten (z. B.
                Carbon). Je nach Anforderung lassen sich damit sowohl optische
                als auch hochbelastbare und temperaturbeständige Komponenten
                realisieren.
                <br />
                <br />
                Geeignet für Einzelteile, Ersatzteile, Sonderanfertigungen
                sowie kleine bis mittlere Stückzahlen.
                <br />
                <br />
                Maximale Bauteilgröße: 33 × 32,5 × 32 cm.
                <br />
                <br />
                Sende uns gerne deine Anfrage. Wir prüfen die technische
                Umsetzbarkeit und erstellen ein individuelles Angebot.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  onClick={() =>
                    openContactModal("3D-Druck Dienstleistung", "service")
                  }
                  className="inline-block rounded-xl bg-neutral-700 px-6 py-3 text-center transition hover:bg-neutral-600"
                >
                  Anfrage senden
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/3D-Druck_S54_Ergebnis.jpg"
                alt="3D-Druck Dienstleistung"
                className="h-64 w-full object-cover sm:h-80 md:h-full"
              />
            </div>
          </div>
        </section>

        <section id="ablauf-artworks" className="mt-16 sm:mt-20 md:mt-24">
          <h2 className="mb-6 text-2xl font-semibold sm:mb-8">
            Ablauf für individuelle 3D-Artworks
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6 sm:p-8">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-lg font-semibold">
                1
              </div>
              <h3 className="text-lg font-semibold sm:text-xl">
                Du sendest uns dein Bild und deine Wünsche
              </h3>
              <p className="mt-3 text-sm text-neutral-400 sm:text-base">
                Sende uns dein Motiv als JPG, PNG, WEBP oder SVG und teile uns
                folgende Informationen mit:
              </p>
              <div className="mt-4 space-y-2 text-sm text-neutral-300 sm:text-base">
                <p>• Schwarz-Weiß oder Farbe</p>
                <p>• Gewünschte Abmessungen</p>
                <p>• Rahmen gewünscht oder nicht</p>
                <p>• Rahmenfarbe</p>
                <p>• Anzahl</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6 sm:p-8">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-lg font-semibold">
                2
              </div>
              <h3 className="text-lg font-semibold sm:text-xl">
                Wir prüfen deine Angaben und erstellen einen Vorabentwurf
              </h3>
              <p className="mt-3 text-sm text-neutral-400 sm:text-base">
                Auf Basis deiner Angaben prüfen wir die Umsetzbarkeit und senden
                dir vor dem Druck einen Vorabentwurf inklusive Preis zu. So
                siehst du bereits vorab, wie das spätere Artwork aussehen wird.
              </p>

              <div className="mt-6 flex justify-center">
                <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src="/Artwork_Stanced_E46_6.png"
                    alt="Vorabentwurf des Artworks"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6 sm:p-8">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-lg font-semibold">
                3
              </div>
              <h3 className="text-lg font-semibold sm:text-xl">
                Du gibst das Angebot frei
              </h3>
              <p className="mt-3 text-sm text-neutral-400 sm:text-base">
                Erst wenn du mit Entwurf und Preis einverstanden bist,
                bestätigst du das Angebot. Vorher wird nichts produziert.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6 sm:p-8">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-lg font-semibold">
                4
              </div>
              <h3 className="text-lg font-semibold sm:text-xl">
                Wir fertigen dein Artwork und verschicken es
              </h3>
              <p className="mt-3 text-sm text-neutral-400 sm:text-base">
                Nach deiner Freigabe fertigen wir das Produkt und versenden es
                anschließend sorgfältig verpackt an dich.
              </p>

              <div className="mt-6 flex justify-center">
                <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src="/Artwork_E46_Ergebnis.jpg"
                    alt="Fertig gedrucktes Artwork"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="galerie" className="mt-16 sm:mt-20 md:mt-24">
          <h2 className="mb-6 text-2xl font-semibold sm:mb-8">Galerie</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <footer className="mt-16 border-t border-white/10 sm:mt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 text-neutral-500 sm:px-6">
          <div className="flex flex-col items-center gap-4 text-center md:grid md:grid-cols-3 md:items-center md:text-left">
            <div className="flex items-center justify-center gap-4 md:justify-start">
              <img
                src="/logo.png"
                alt="Glück Engineering Logo"
                className="h-14 w-14 object-contain md:h-16 md:w-16"
              />
              <span>© Glück Engineering</span>
            </div>

            <div className="text-sm text-center leading-tight">
              <div>Inhaber M.Eng. Werner Glück</div>
              <div className="text-neutral-400">94424 Arnstorf</div>
            </div>

            <div className="flex justify-center md:justify-end">
              <a href={contactLink} className="text-sm hover:text-white">
                {contactEmail}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8"
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
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-6 sm:items-center sm:py-8">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-neutral-900 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold sm:text-2xl">
                {requestSubject}
              </h2>
              <button
                onClick={closeContactModal}
                className="rounded-lg px-3 py-2 text-neutral-400 transition hover:bg-white/5 hover:text-white"
                disabled={isSending}
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

              {requestType === "general" && (
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Deine Nachricht *"
                  className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
                />
              )}

              {requestType === "product" && (
                <>
                  <div>
                    <label className="mb-2 block text-sm text-neutral-300">
                      Anzahl der benötigten Teile *
                    </label>
                    <input
                      type="number"
                      min="1"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="z. B. 1"
                      className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
                    />
                  </div>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Weitere Informationen"
                    className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
                  />
                </>
              )}

              {requestType === "custom" && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-neutral-300">
                        Ausführung *
                      </label>
                      <select
                        name="artworkColorMode"
                        value={formData.artworkColorMode}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none"
                      >
                        <option value="">Bitte auswählen</option>
                        <option value="Schwarz-Weiß">Schwarz-Weiß</option>
                        <option value="Farbe">Farbe</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-neutral-300">
                        Anzahl *
                      </label>
                      <input
                        type="number"
                        min="1"
                        name="artworkQuantity"
                        value={formData.artworkQuantity}
                        onChange={handleInputChange}
                        placeholder="z. B. 1"
                        className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-neutral-300">
                      Abmessungen in cm *
                    </label>
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        name="artworkWidth"
                        value={formData.artworkWidth}
                        onChange={handleInputChange}
                        placeholder="Breite"
                        className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
                      />
                      <span className="text-neutral-400">×</span>
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        name="artworkHeight"
                        value={formData.artworkHeight}
                        onChange={handleInputChange}
                        placeholder="Höhe"
                        className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-neutral-300">
                        Rahmen gewünscht *
                      </label>
                      <select
                        name="artworkFrame"
                        value={formData.artworkFrame}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none"
                      >
                        <option value="">Bitte auswählen</option>
                        <option value="Ja">Ja</option>
                        <option value="Nein">Nein</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-neutral-300">
                        Rahmenfarbe {formData.artworkFrame === "Ja" ? "*" : ""}
                      </label>
                      <select
                        name="artworkFrameColor"
                        value={formData.artworkFrameColor}
                        onChange={handleInputChange}
                        disabled={formData.artworkFrame !== "Ja"}
                        className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Bitte auswählen</option>
                        <option value="Schwarz">Schwarz</option>
                        <option value="Weiß">Weiß</option>
                      </select>
                    </div>
                  </div>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Motiv / Hinweise"
                    className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
                  />
                </>
              )}

              {requestType === "service" && (
                <>
                  <div>
                    <label className="mb-2 block text-sm text-neutral-300">
                      Gewünschtes Material *
                    </label>
                    <input
                      type="text"
                      name="serviceMaterial"
                      value={formData.serviceMaterial}
                      onChange={handleInputChange}
                      placeholder="Nach Empfehlung"
                      className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-neutral-300">
                      Einsatzbereich *
                    </label>
                    <input
                      type="text"
                      name="serviceApplication"
                      value={formData.serviceApplication}
                      onChange={handleInputChange}
                      placeholder="z. B. Innenraum, Motorraum, Prototyp, Dekoration"
                      className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-neutral-300">
                      Anzahl *
                    </label>
                    <input
                      type="number"
                      min="1"
                      name="serviceQuantity"
                      value={formData.serviceQuantity}
                      onChange={handleInputChange}
                      placeholder="z. B. 1"
                      className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
                    />
                  </div>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Weitere Informationen"
                    className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
                  />
                </>
              )}

              {requestType !== "product" && requestType !== "general" && (
                <div className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3">
                  <label className="mb-2 block text-sm text-neutral-300">
                    Datei anhängen{" "}
                    {requestType === "custom" ? "(empfohlen)" : "(optional)"}
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-neutral-400 file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-700 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-600"
                    accept=".jpg,.jpeg,.png,.webp,.svg,.pdf,.step,.stp,.stl,.3mf,.zip"
                  />
                  {attachment && (
                    <p className="mt-2 text-sm text-neutral-400">
                      Ausgewählt: {attachment.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                onClick={closeContactModal}
                className="rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5"
                disabled={isSending}
              >
                Abbrechen
              </button>

              <button
                onClick={submitContactForm}
                className="rounded-xl bg-neutral-700 px-6 py-3 transition hover:bg-neutral-600 disabled:opacity-50"
                disabled={isSending}
              >
                {isSending ? "Wird gesendet..." : "Anfrage senden"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
