import { useState } from "react";

export default function GlueckEngineeringWebsite() {
  const contactEmail = "info@glueckengineering.com";

  const fertigteile = [
    {
      name: "Führung für Blende / unterer Kühlergrill VW T4 (langer Vorderwagen)",
      image: "/placeholder.png",
      text: "Passgenaue Führung für den unteren Kühlergrill beim VW T4.",
    },
  ];

  const galleryImages = [
    "/Artwork_Stanced_E46.png",
    "/Artwork_Stanced_E46_2.png",
    "/Artwork_Stanced_E46_3.png",
    "/Artwork_Stanced_E46_4.png",
    "/Artwork_Stanced_E46_5.png",
    "/Artwork_Stanced_E46_6.png",
    "/Artwork_Stanced_E46_7.png",
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

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-6">
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

          <a
            href="#fertigteile"
            className="rounded-xl border border-white/10 px-4 py-3 text-sm transition hover:bg-white/5"
          >
            Inhalte ansehen
          </a>
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
            Individuelle Fertigteile, Artworks und 3D-Drucklösungen mit
            besonderem Charakter.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="#fertigteile"
              className="rounded-xl bg-neutral-700 px-5 py-3 transition hover:bg-neutral-600"
            >
              Inhalte ansehen
            </a>
            <a
              href={contactLink}
              className="rounded-xl border border-white/10 px-5 py-3 transition hover:bg-white/5"
            >
              Kontakt
            </a>
          </div>
        </section>

        <section id="fertigteile" className="mt-24">
          <h2 className="mb-8 text-2xl font-semibold">Fertigteile</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fertigteile.map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl border border-white/10 bg-neutral-900 p-6"
              >
                <div className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-neutral-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mt-4 text-lg">{item.name}</h3>
                <p className="mt-2 text-sm text-neutral-400">{item.text}</p>

                <a
                  href={buildProductRequestLink(item.name)}
                  className="mt-6 inline-block rounded-xl bg-neutral-700 py-3 text-center transition hover:bg-neutral-600"
                >
                  Anfrage senden
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="galerie" className="mt-24">
          <h2 className="mb-8 text-2xl font-semibold">Galerie</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(image)}
                className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 text-left transition hover:scale-[1.01] hover:border-white/20"
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

        <section className="mx-auto mt-20 max-w-3xl rounded-2xl border border-white/10 bg-neutral-900 p-8 text-center">
          <h2 className="text-2xl font-semibold">
            Individuelles 3D-Bild aus deinem Motiv
          </h2>

          <p className="mt-4 text-neutral-400">
            Wir können dein Bild individuell in ein mehrschichtiges 3D-Bild
            umwandeln und drucken. So entsteht aus deinem eigenen Motiv ein
            persönliches Artwork mit besonderer Tiefe und Struktur.
          </p>

          <a
            href={buildCustomRequestLink()}
            className="mt-8 inline-block rounded-xl bg-neutral-700 px-6 py-3 transition hover:bg-neutral-600"
          >
            Anfrage senden
          </a>
        </section>
      </main>

      <footer className="mt-20 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-neutral-500 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Glück Engineering Logo"
              className="h-16 w-16 shrink-0 object-contain"
            />
            <span>© Glück Engineering</span>
          </div>

          <a
            href={contactLink}
            className="text-sm transition hover:text-white"
          >
            {contactEmail}
          </a>
        </div>
      </footer>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 z-10 rounded-lg bg-black/60 px-3 py-2 text-sm text-white transition hover:bg-black/80"
            >
              Schließen
            </button>

            <img
              src={selectedImage}
              alt="Vollansicht"
              className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
