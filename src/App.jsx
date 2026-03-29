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

  const buildProductRequestLink = (itemName) => {
    const body = `Hallo,

ich interessiere mich für folgendes Fertigteil:
${itemName}

Name:
E-Mail:

Weitere Informationen:

Viele Grüße`;

    return `mailto:${contactEmail}?subject=${encodeURIComponent(
      `Anfrage: ${itemName}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const buildServiceRequestLink = () => {
    const body = `Hallo,

ich interessiere mich für eine individuelle 3D-Drucklösung.

Name:
E-Mail:

Was soll gedruckt werden?
Gewünschtes Material:
Einsatzbereich:
Weitere Informationen:

Viele Grüße`;

    return `mailto:${contactEmail}?subject=${encodeURIComponent(
      "Anfrage: 3D-Druck"
    )}&body=${encodeURIComponent(body)}`;
  };

  const buildCustomRequestLink = () => {
    const body = `Hallo,

ich interessiere mich für ein individuelles 3D-Artwork auf Basis eines eigenen Bildes.

Name:
E-Mail:

Bitte folgende Informationen angeben:
- Schwarz-Weiß oder in Farbe
- Abmessungen
- Rahmen gewünscht / nicht gewünscht
- Rahmenfarbe
- Anzahl

Motiv / Hinweise:

Viele Grüße`;

    return `mailto:${contactEmail}?subject=${encodeURIComponent(
      "Anfrage: Individuelles 3D-Artwork"
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
        {/* HERO */}
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

        {/* FERTIGTEILE */}
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

                <a
                  href={buildProductRequestLink(item.name)}
                  className="mt-6 rounded-xl bg-neutral-700 py-3 text-center transition hover:bg-neutral-600"
                >
                  Anfrage senden
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CUSTOM */}
        <section className="mt-24">
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-10 text-center">
            <h2 className="text-2xl font-semibold">
              Individuelles 3D-Bild aus deinem Motiv
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-neutral-400">
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

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={buildCustomRequestLink()}
                className="inline-block rounded-xl bg-neutral-700 px-6 py-3 transition hover:bg-neutral-600"
              >
                Anfrage senden
              </a>

              <a
                href="#ablauf-artworks"
                className="inline-block rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5"
              >
                Zum Ablauf
              </a>
            </div>
          </div>
        </section>

        {/* 3D DRUCK */}
        <section className="mt-20">
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-10 text-center">
            <h2 className="text-2xl font-semibold">3D-Druck</h2>

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

            <a
              href={buildServiceRequestLink()}
              className="mt-8 inline-block rounded-xl bg-neutral-700 px-6 py-3 transition hover:bg-neutral-600"
            >
              Anfrage senden
            </a>
          </div>
        </section>

        {/* ABLAUF ARTWORKS */}
        <section id="ablauf-artworks" className="mt-24">
          <h2 className="mb-8 text-2xl font-semibold">Ablauf für individuelle 3D-Artworks</h2>

          <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-lg font-semibold">
                1
              </div>
              <h3 className="text-xl font-semibold">Du sendest uns dein Bild und deine Wünsche</h3>
              <p className="mt-3 text-neutral-400">
                Sende uns dein Motiv als JPG, PNG, WEBP oder SVG per E-Mail und teile
                uns folgende Informationen mit:
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
              <h3 className="text-xl font-semibold">Wir prüfen deine Angaben und erstellen einen Vorabentwurf</h3>
              <p className="mt-3 text-neutral-400">
                Auf Basis deiner Angaben prüfen wir die Umsetzbarkeit und senden dir
                vor dem Druck einen Vorabentwurf inklusive Preis zu. So siehst du
                bereits vorab, wie das spätere Artwork aussehen wird.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="/Artwork_Kein_Leben_bleibt.jpg"
                  alt="Vorabentwurf des Artworks"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-lg font-semibold">
                3
              </div>
              <h3 className="text-xl font-semibold">Du gibst das Angebot frei</h3>
              <p className="mt-3 text-neutral-400">
                Erst wenn du mit Entwurf und Preis einverstanden bist, bestätigst du
                das Angebot. Vorher wird nichts produziert.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-lg font-semibold">
                4
              </div>
              <h3 className="text-xl font-semibold">Wir fertigen dein Artwork und verschicken es</h3>
              <p className="mt-3 text-neutral-400">
                Nach deiner Freigabe fertigen wir das Produkt und versenden es
                anschließend sorgfältig verpackt an dich.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="/Artwork_Kein_Leben_bleibt_Ergebnis.png"
                  alt="Fertig gedrucktes Artwork"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* GALERIE */}
        <section className="mt-24">
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

      {/* FOOTER */}
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

      {/* LIGHTBOX */}
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
    </div>
  );
}
