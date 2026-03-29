import { useMemo } from "react";

export default function GlueckEngineeringWebsite() {
  const contactEmail = "info@glueckengineering.com";

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
            href="#galerie"
            className="rounded-xl border border-white/10 px-4 py-3 text-sm transition hover:bg-white/5"
          >
            Galerie ansehen
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
            Individuelle 3D-Drucklösungen und mehrschichtige Artworks mit
            besonderem Charakter.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="#galerie"
              className="rounded-xl bg-neutral-700 px-5 py-3 transition hover:bg-neutral-600"
            >
              Zur Galerie
            </a>
            <a
              href={contactLink}
              className="rounded-xl border border-white/10 px-5 py-3 transition hover:bg-white/5"
            >
              Kontakt
            </a>
          </div>
        </section>

        <section id="galerie" className="mt-24">
          <h2 className="mb-8 text-2xl font-semibold">Galerie</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
              >
                <img
                  src={image}
                  alt={`Artwork ${index + 1}`}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-3xl rounded-2xl border border-white/10 bg-neutral-900 p-8 text-center">
          <h2 className="text-2xl font-semibold">
            Individuelles 3D-Bild aus deinem Motiv
          </h2>

          <p className="mt-4 text-neutral-400">
            Wir können das Bild unserer Kunden individuell in ein
            mehrschichtiges 3D-Bild umwandeln und drucken. So entsteht aus
            deinem eigenen Motiv ein persönliches Artwork mit besonderer Tiefe
            und Struktur.
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
    </div>
  );
}
