import { useState } from "react";

export default function GlueckEngineeringWebsite() {
  const contactEmail = "info@glueckengineering.com";

  const fertigteile = [
    {
      name: "Führung für Blende / unterer Kühlergrill VW T4 (langer Vorderwagen)",
      imageType: "comingSoon",
      text: "Passgenaue Führung für den unteren Kühlergrill beim VW T4.",
    },
  ];

  const galleryImages = [
    "/Artwork_Stanced_E46.png",
    "/Artwork_Stanced_E46_3.png",
    "/Artwork_Stanced_E46_5.png",
    "/Artwork_Stanced_E46_6.png",
    "/Artwork_E87.png",
    "/Artwork_Foggy_Mountains.png",
    "/Artwork_Wave.png",
    "/Artwork_Kein_Leben_bleibt.png",
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const buildProductRequestLink = (itemName) => {
    const body = `Hallo,

ich interessiere mich für folgendes Fertigteil:
${itemName}

Name:
E-Mail:

Weitere Infos:

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
Materialwunsch:
Einsatzbereich:
Weitere Infos:

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

Gewünschtes Motiv / Hinweise:

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
      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-6">
            <img src="/logo.png" className="h-36 w-36 object-contain" />
            <span className="text-2xl font-semibold md:text-3xl">
              Glück Engineering
            </span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-6 py-20">
        {/* HERO */}
        <section>
          <h1 className="text-4xl font-semibold md:text-6xl">
            Teile, die funktionieren.
            <br />
            Designs, die auffallen.
          </h1>

          <p className="mt-6 max-w-2xl text-neutral-400">
            Individuelle Fertigteile, Artworks und 3D-Drucklösungen.
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
                  className="mt-6 rounded-xl bg-neutral-700 py-3 text-center"
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
              Wir verwandeln dein Bild in ein mehrschichtiges 3D-Bild und fertigen
              daraus ein individuelles Artwork.
            </p>

            <a
              href={buildCustomRequestLink()}
              className="mt-8 inline-block rounded-xl bg-neutral-700 px-6 py-3"
            >
              Anfrage senden
            </a>
          </div>
        </section>

        {/* 3D DRUCK */}
        <section className="mt-20">
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-10 text-center">
            <h2 className="text-2xl font-semibold">3D-Druck</h2>

            <p className="mt-4 max-w-2xl mx-auto text-neutral-400">
              Individuelle 3D-Drucklösungen für funktionale Bauteile und Prototypen.
            </p>

            <a
              href={buildServiceRequestLink()}
              className="mt-8 inline-block rounded-xl bg-neutral-700 px-6 py-3"
            >
              Anfrage senden
            </a>
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
                className="aspect-square overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={image}
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
            <img src="/logo.png" className="h-16 w-16 object-contain" />
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
          className="fixed inset-0 bg-black/90 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} className="max-h-[85vh]" />
        </div>
      )}
    </div>
  );
}
