import { useMemo } from "react";

export default function GlueckEngineeringWebsite() {
  const contactEmail = "info@glueck-engineering.de";

  const offerings = [
    {
      name: "Führung für Blende / unterer Kühlergrill VW T4 (langer Vorderwagen)",
      category: "Fertigteile",
      price: "19,99 € zzgl. Versand",
      image: "/placeholder.png",
      text: "Passgenaue Führung für den unteren Kühlergrill beim VW T4.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 (25x25 cm)",
      category: "3D-Artworks",
      price: "24,99 € zzgl. Versand",
      image: "/Artwork_Stanced_E46.png",
      text: "Mehrschichtiges 3D-Artwork im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Custom 3D-Artwork (Schwarz / Weiß)",
      category: "3D-Artworks",
      price: "34,99 € zzgl. Versand",
      imageType: "custom",
      text: "Individuelles Artwork auf Basis deines Bildes in Schwarz-Weiß.",
      requestType: "custom",
    },
    {
      name: "Custom 3D-Artwork (bis zu 6 Farben)",
      category: "3D-Artworks",
      price: "44,99 € zzgl. Versand",
      imageType: "customColor",
      text: "Individuelles mehrfarbiges 3D-Artwork (bis zu 6 Farben).",
      requestType: "custom",
    },
    {
      name: "3D-Druckservice",
      category: "Druckservice",
      price: "auf Anfrage",
      imageType: "service",
      text: "3D-Druckservice für funktionale Bauteile.",
      requestType: "service",
    },
  ];

  const groupedOfferings = useMemo(() => {
    return {
      Fertigteile: offerings.filter((i) => i.category === "Fertigteile"),
      "3D-Artworks": offerings.filter((i) => i.category === "3D-Artworks"),
      Druckservice: offerings.filter((i) => i.category === "Druckservice"),
    };
  }, [offerings]);

  const buildMailtoLink = (item) => {
    let body = "";

    if (item.requestType === "product") {
      body = `Hallo,

ich interessiere mich für:
${item.name}

Name:
Stückzahl:
E-Mail (optional):

Viele Grüße`;
    } else if (item.requestType === "custom") {
      body = `Hallo,

ich interessiere mich für ein Custom Artwork.

Größe:

Name:
E-Mail (optional):

Bitte die gewünschte Datei anhängen (JPG, PNG, WEBP oder SVG).

Weitere Infos:

Viele Grüße`;
    } else {
      body = `Hallo,

ich habe eine Anfrage zum 3D-Druck.

Material oder Einsatzzweck:
Stückzahl:

Name:
E-Mail (optional):

Falls vorhanden, bitte die gewünschte Datei anhängen.

Weitere Infos:

Viele Grüße`;
    }

    return `mailto:${contactEmail}?subject=${encodeURIComponent(
      item.name
    )}&body=${encodeURIComponent(body)}`;
  };

  const contactLink = () => `mailto:${contactEmail}`;

  const VisualCard = ({ item }) => {
    if (item.imageType === "custom") {
      return (
        <div className="flex h-full items-center justify-center bg-neutral-950">
          <span className="text-sm uppercase tracking-widest text-white">
            Custom SW
          </span>
        </div>
      );
    }

    if (item.imageType === "customColor") {
      return (
        <div className="flex h-full items-center justify-center bg-neutral-950 px-4 text-center">
          <span className="bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500 bg-clip-text text-sm font-semibold uppercase tracking-widest text-transparent">
            Bis zu 6 Farben
          </span>
        </div>
      );
    }

    if (item.imageType === "service") {
      return (
        <div className="flex h-full items-center justify-center bg-neutral-950">
          <span className="text-sm uppercase tracking-widest text-white">
            3D Druck
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

  const Card = ({ item }) => (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-neutral-800 p-6">
      <div className="flex justify-between text-sm text-neutral-400">
        <span>{item.category}</span>
        <span>{item.price}</span>
      </div>

      <div className="mt-4 aspect-square overflow-hidden rounded-xl">
        <VisualCard item={item} />
      </div>

      <h3 className="mt-4 text-lg text-white">{item.name}</h3>
      <p className="mt-2 text-sm text-neutral-400">{item.text}</p>

      <a
        href={buildMailtoLink(item)}
        className="mt-6 inline-block rounded-xl bg-neutral-700 py-3 text-center transition hover:bg-neutral-600"
      >
        Anfrage senden
      </a>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-6">
          <img
            src="/logo.png"
            alt="Glück Engineering Logo"
            className="h-36 w-36 object-contain"
          />
          <span className="text-2xl font-semibold md:text-3xl">
            Glück Engineering
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-20 px-6 py-20">
        <section>
          <h1 className="text-4xl font-semibold md:text-6xl">
            Teile, die funktionieren.
            <br />
            Designs, die auffallen.
          </h1>

          <p className="mt-6 text-neutral-400">
            Individuelle Fertigteile, Artworks und 3D-Drucklösungen.
          </p>

          <p className="mt-4 text-sm text-neutral-500">
            Alle Produkte werden individuell gefertigt und sind keine Lagerware.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="#leistungen"
              className="rounded-xl bg-neutral-700 px-5 py-3 transition hover:bg-neutral-600"
            >
              Leistungen ansehen
            </a>
            <a
              href={contactLink()}
              className="rounded-xl border border-white/10 px-5 py-3 transition hover:bg-white/5"
            >
              Kontakt
            </a>
          </div>
        </section>

        {Object.entries(groupedOfferings).map(([key, items]) => (
          <section
            key={key}
            id="leistungen"
          >
            <h2 className="mb-6 text-2xl">{key}</h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <Card
                  key={item.name}
                  item={item}
                />
              ))}
            </div>
          </section>
        ))}

        <section className="border-t border-white/10 pt-10">
          <h2 className="text-2xl">Weitere Fragen?</h2>
          <a
            href={contactLink()}
            className="mt-6 inline-block rounded-xl bg-neutral-700 px-5 py-3 transition hover:bg-neutral-600"
          >
            Kontakt aufnehmen
          </a>
        </section>
      </main>

      <footer className="mt-20 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-8 text-neutral-500">
          <img
            src="/logo.png"
            alt="Glück Engineering Logo"
            className="h-16 w-16 object-contain shrink-0"
          />
          <span>© Glück Engineering</span>
        </div>
      </footer>
    </div>
  );
}