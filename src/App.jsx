import { useMemo } from "react";

export default function GlueckEngineeringWebsite() {
  const contactEmail = "info@glueckengineering.com";

  const offerings = [
    {
      name: "Führung für Blende / unterer Kühlergrill VW T4 (langer Vorderwagen)",
      category: "Fertigteile",
      imageType: "comingSoon",
      text: "Passgenaue Führung für den unteren Kühlergrill beim VW T4.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V1 (25x25 cm)",
      category: "3D-Artworks",
      image: "/Artwork_Stanced_E46.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V2 (25x25 cm)",
      category: "3D-Artworks",
      image: "/Artwork_Stanced_E46_2.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V3 (25x25 cm)",
      category: "3D-Artworks",
      image: "/Artwork_Stanced_E46_3.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V4 (25x25 cm)",
      category: "3D-Artworks",
      image: "/Artwork_Stanced_E46_4.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V5 (25x25 cm)",
      category: "3D-Artworks",
      image: "/Artwork_Stanced_E46_5.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V6 (25x25 cm)",
      category: "3D-Artworks",
      image: "/Artwork_Stanced_E46_6.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V7 (25x25 cm)",
      category: "3D-Artworks",
      image: "/Artwork_Stanced_E46_7.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E87 (25x25 cm)",
      category: "3D-Artworks",
      image: "/Artwork_E87.png",
      text: "Mehrschichtiges 3D-Artwork eines BMW E87 im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Foggy Mountains with Border (25x25 cm)",
      category: "3D-Artworks",
      image: "/Artwork_Foggy_Mountains.png",
      text: "Mehrschichtiges 3D-Artwork einer Berglandschaft in Nebel gehüllt.",
      requestType: "product",
    },
    {
      name: "Wave with Border (25x25 cm)",
      category: "3D-Artworks",
      image: "/Artwork_Wave.png",
      text: "Mehrschichtiges 3D-Artwork einer Welle als dekoratives Wandbild.",
      requestType: "product",
    },
    {
      name: "No Life Remains (25x25 cm)",
      category: "3D-Artworks",
      image: "/Artwork_Kein_Leben_bleibt.png",
      text: "Mehrschichtiges 3D-Artwork des Sensenmanns in düsterer Atmosphäre.",
      requestType: "product",
    },
    {
      name: "Custom 3D-Artwork (Schwarz / Weiß)",
      category: "Custom Artworks",
      imageType: "custom",
      text: "Individuelles Artwork auf Basis deines Bildes in Schwarz-Weiß.",
      requestType: "custom",
    },
    {
      name: "Custom 3D-Artwork (bis zu 6 Farben)",
      category: "Custom Artworks",
      imageType: "customColor",
      text: "Individuelles mehrfarbiges 3D-Artwork bis zu 6 Farben.",
      requestType: "custom",
    },
    {
      name: "3D-Druckservice",
      category: "Druckservice",
      imageType: "service",
      text: "3D-Druckservice für funktionale Bauteile und individuelle Lösungen.",
      requestType: "service",
    },
  ];

  const groupedOfferings = useMemo(() => {
    return {
      Fertigteile: offerings.filter((i) => i.category === "Fertigteile"),
      "3D-Artworks": offerings.filter((i) => i.category === "3D-Artworks"),
      "Custom Artworks": offerings.filter((i) => i.category === "Custom Artworks"),
      Druckservice: offerings.filter((i) => i.category === "Druckservice"),
    };
  }, []);

  const buildMailtoLink = (item) => {
    let body = "";

    if (item.requestType === "custom") {
      body = `Hallo,

ich interessiere mich für:
${item.name}

Name:
E-Mail:

Bitte die gewünschte Datei anhängen (JPG, PNG, WEBP oder SVG).

Weitere Infos:

Viele Grüße`;
    } else if (item.requestType === "service") {
      body = `Hallo,

ich interessiere mich für euren 3D-Druckservice.

Name:
E-Mail:

Was soll gedruckt werden?
Materialwunsch:
Einsatzbereich:
Weitere Infos:

Viele Grüße`;
    } else {
      body = `Hallo,

ich interessiere mich für:
${item.name}

Name:
E-Mail:

Weitere Infos:

Viele Grüße`;
    }

    return `mailto:${contactEmail}?subject=${encodeURIComponent(
      `Anfrage: ${item.name}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const contactLink = `mailto:${contactEmail}`;

  const VisualCard = ({ item }) => {
    if (item.imageType === "comingSoon") {
      return (
        <div className="flex h-full items-center justify-center bg-neutral-950 px-6 text-center">
          <span className="text-lg font-semibold uppercase tracking-[0.2em] text-white">
            Coming soon
          </span>
        </div>
      );
    }

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

  const ProductCard = ({ item }) => {
    return (
      <div className="flex flex-col rounded-2xl border border-white/10 bg-neutral-800 p-6">
        <div className="text-sm text-neutral-400">
          <span>{item.category}</span>
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
  };

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
            href="#leistungen"
            className="rounded-xl border border-white/10 px-4 py-3 text-sm transition hover:bg-white/5"
          >
            Beispiele ansehen
          </a>
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
            Beispiele für Fertigteile, Artworks und individuelle 3D-Drucklösungen.
          </p>

          <p className="mt-4 text-sm text-neutral-500">
            Alle Produkte und Projekte dienen als Referenzen und werden individuell auf Anfrage gefertigt.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="#leistungen"
              className="rounded-xl bg-neutral-700 px-5 py-3 transition hover:bg-neutral-600"
            >
              Beispiele ansehen
            </a>
            <a
              href={contactLink}
              className="rounded-xl border border-white/10 px-5 py-3 transition hover:bg-white/5"
            >
              Kontakt
            </a>
          </div>
        </section>

        {Object.entries(groupedOfferings).map(([key, items], index) => (
          <section key={key} id={index === 0 ? "leistungen" : undefined}>
            <h2 className="mb-6 text-2xl">{key}</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ProductCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        ))}

        <section className="border-t border-white/10 pt-10">
          <h2 className="text-2xl">Weitere Fragen?</h2>
          <p className="mt-4 text-neutral-400">
            Für individuelle Anfragen, Sonderanfertigungen oder Druckaufträge einfach per E-Mail melden.
          </p>
          <a
            href={contactLink}
            className="mt-6 inline-block rounded-xl bg-neutral-700 px-5 py-3 transition hover:bg-neutral-600"
          >
            Kontakt aufnehmen
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
