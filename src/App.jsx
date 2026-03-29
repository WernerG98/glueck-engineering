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
            <img src="/logo.png" className="h-36 w-36 object-contain" />
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
                  className="mt-6 rounded-xl bg-neutral-700 py-3 text-center"
                >
                  Anfrage senden
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CUSTOM MIT BILD */}
        <section className="mt-24">
          <div className="grid gap-8 rounded-2xl border border-white/10 bg-neutral-900 p-10 md:grid-cols-2 md:items-center">
            
            {/* TEXT LINKS */}
            <div>
              <h2 className="text-2xl font-semibold">
                Individuelles 3D-Bild aus deinem Motiv
              </h2>

              <p className="mt-4 text-neutral-400">
                Wir verwandeln dein Motiv in ein mehrschichtiges 3D-Artwork mit
                klarer Tiefenwirkung. Möglich sind sowohl schwarz-weiße
                Ausführungen als auch mehrfarbige Varianten mit bis zu sechs
                Farben.
                <br /><br />
                Maximale Bauteilgröße: 33 × 32,5 × 32 cm.
                <br />
                Preise ab 19,99 € (Schwarz-Weiß) bzw. ab 29,99 € (mehrfarbig).
                <br /><br />
                Sende uns dein Bild per E-Mail. Mit der Übermittlung bestätigst
                du, dass du über die erforderlichen Nutzungsrechte verfügst.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={buildCustomRequestLink()}
                  className="rounded-xl bg-neutral-700 px-6 py-3"
                >
                  Anfrage senden
                </a>

                <a
                  href="#ablauf-artworks"
                  className="rounded-xl border border-white/10 px-6 py-3"
                >
                  Zum Ablauf
                </a>

                <a
                  href="#galerie"
                  className="rounded-xl border border-white/10 px-6 py-3"
                >
                  Zur Galerie
                </a>
              </div>
            </div>

            {/* BILD RECHTS */}
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/Artwork_Stanced_E46.png"
                alt="3D Artwork BMW E46"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* REST BLEIBT UNVERÄNDERT (3D Druck, Ablauf, Galerie, Footer...) */}
