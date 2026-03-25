import { useMemo, useState } from "react";

export default function GlueckEngineeringWebsite() {
  const contactEmail = "info@glueckengineering.com";
  const shippingCost = 6.19;

  const offerings = [
    {
      name: "Führung für Blende / unterer Kühlergrill VW T4 (langer Vorderwagen)",
      category: "Fertigteile",
      price: 19.99,
      priceLabel: "19,99 € zzgl. Versand",
      imageType: "comingSoon",
      text: "Passgenaue Führung für den unteren Kühlergrill beim VW T4.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V1 (25x25 cm)",
      category: "3D-Artworks",
      price: 24.99,
      priceLabel: "24,99 € zzgl. Versand",
      image: "/Artwork_Stanced_E46.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V2 (25x25 cm)",
      category: "3D-Artworks",
      price: 24.99,
      priceLabel: "24,99 € zzgl. Versand",
      image: "/Artwork_Stanced_E46_2.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V3 (25x25 cm)",
      category: "3D-Artworks",
      price: 24.99,
      priceLabel: "24,99 € zzgl. Versand",
      image: "/Artwork_Stanced_E46_3.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V4 (25x25 cm)",
      category: "3D-Artworks",
      price: 24.99,
      priceLabel: "24,99 € zzgl. Versand",
      image: "/Artwork_Stanced_E46_4.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V5 (25x25 cm)",
      category: "3D-Artworks",
      price: 24.99,
      priceLabel: "24,99 € zzgl. Versand",
      image: "/Artwork_Stanced_E46_5.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V6 (25x25 cm)",
      category: "3D-Artworks",
      price: 24.99,
      priceLabel: "24,99 € zzgl. Versand",
      image: "/Artwork_Stanced_E46_6.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E46 V7 (25x25 cm)",
      category: "3D-Artworks",
      price: 24.99,
      priceLabel: "24,99 € zzgl. Versand",
      image: "/Artwork_Stanced_E46_7.png",
      text: "Mehrschichtiges 3D-Artwork einer BMW E46 Limousine im Stance-Look.",
      requestType: "product",
    },
    {
      name: "Stanced BMW E87 (25x25 cm)",
      category: "3D-Artworks",
      price: 24.99,
      priceLabel: "24,99 € zzgl. Versand",
      image: "/Artwork_E87.png",
      text: "Mehrschichtiges 3D-Artwork eines BMW E87 im Stance-Look.",
      requestType: "product",
    },
    {
      name: "No Life Remains (25x25 cm)",
      category: "3D-Artworks",
      price: 24.99,
      priceLabel: "24,99 € zzgl. Versand",
      image: "/Artwork_Kein_Leben_bleibt.png",
      text: "Mehrschichtiges 3D-Artwork des Sensenmanns in düsterer Atmosphäre, welcher die letzte Rose pflückt.",
      requestType: "product",
    },
    {
      name: "Custom 3D-Artwork (Schwarz / Weiß)",
      category: "Custom Artworks",
      price: 34.99,
      priceLabel: "34,99 € zzgl. Versand",
      imageType: "custom",
      text: "Individuelles Artwork auf Basis deines Bildes in Schwarz-Weiß.",
      requestType: "custom",
    },
    {
      name: "Custom 3D-Artwork (bis zu 6 Farben)",
      category: "Custom Artworks",
      price: 44.99,
      priceLabel: "44,99 € zzgl. Versand",
      imageType: "customColor",
      text: "Individuelles mehrfarbiges 3D-Artwork (bis zu 6 Farben).",
      requestType: "custom",
    },
    {
      name: "3D-Druckservice",
      category: "Druckservice",
      price: null,
      priceLabel: "auf Anfrage",
      imageType: "service",
      text: "3D-Druckservice für funktionale Bauteile.",
      requestType: "service",
    },
  ];

  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    street: "",
    zip: "",
    city: "",
    note: "",
  });

  const groupedOfferings = useMemo(() => {
    return {
      Fertigteile: offerings.filter((i) => i.category === "Fertigteile"),
      "3D-Artworks": offerings.filter((i) => i.category === "3D-Artworks"),
      "Custom Artworks": offerings.filter((i) => i.category === "Custom Artworks"),
      Druckservice: offerings.filter((i) => i.category === "Druckservice"),
    };
  }, []);

  const formatPrice = (value) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  const addToCart = (item, quantity) => {
    if (item.requestType !== "product" || item.price == null) return;
    if (quantity < 1) return;

    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.name === item.name);

      if (existing) {
        return prev.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity }];
    });
  };

  const increaseQuantity = (name) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (name) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = cart.length > 0 ? subtotal + shippingCost : 0;

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
    } else {
      body = `Hallo,

ich habe eine Anfrage zu:
${item.name}

Name:
E-Mail:

Weitere Infos:

Viele Grüße`;
    }

    return `mailto:${contactEmail}?subject=${encodeURIComponent(
      item.name
    )}&body=${encodeURIComponent(body)}`;
  };

  const buildCartMailto = () => {
    const orderLines = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}
   Stückzahl: ${item.quantity}
   Einzelpreis: ${formatPrice(item.price)}
   Gesamt: ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n\n");

    const body = `Hallo,

es ist eine neue Bestellung eingegangen.

Kundendaten:
Name: ${customerData.name}
E-Mail: ${customerData.email}
Straße / Hausnummer: ${customerData.street}
PLZ / Ort: ${customerData.zip} ${customerData.city}

Bestellung:
${orderLines}

Zwischensumme: ${formatPrice(subtotal)}
Versand: ${formatPrice(shippingCost)}
Gesamtsumme: ${formatPrice(total)}

Hinweis des Kunden:
${customerData.note || "-"}

Ausgewählte Datei:
${selectedFile ? selectedFile.name : "Keine Datei ausgewählt"}

Hinweis:
Rechnung liegt der Sendung bei.`;

    return `mailto:${contactEmail}?subject=${encodeURIComponent(
      "Neue Bestellung über die Website"
    )}&body=${encodeURIComponent(body)}`;
  };

  const contactLink = () => `mailto:${contactEmail}`;

  const handleCheckoutInput = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const openCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
  };

  const submitOrder = () => {
    if (
      !customerData.name.trim() ||
      !customerData.email.trim() ||
      !customerData.street.trim() ||
      !customerData.zip.trim() ||
      !customerData.city.trim()
    ) {
      alert("Bitte alle Pflichtfelder ausfüllen.");
      return;
    }

    window.location.href = buildCartMailto();
  };

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
    const [quantity, setQuantity] = useState(1);

    return (
      <div className="flex flex-col rounded-2xl border border-white/10 bg-neutral-800 p-6">
        <div className="flex justify-between text-sm text-neutral-400">
          <span>{item.category}</span>
          <span>{item.priceLabel}</span>
        </div>

        <div className="mt-4 aspect-square overflow-hidden rounded-xl">
          <VisualCard item={item} />
        </div>

        <h3 className="mt-4 text-lg text-white">{item.name}</h3>
        <p className="mt-2 text-sm text-neutral-400">{item.text}</p>

        {item.requestType === "product" && item.price != null ? (
          <>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="h-10 w-10 rounded-lg bg-neutral-700 transition hover:bg-neutral-600"
              >
                -
              </button>

              <span className="min-w-[40px] text-center text-lg">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="h-10 w-10 rounded-lg bg-neutral-700 transition hover:bg-neutral-600"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(item, quantity)}
              className="mt-4 inline-block rounded-xl bg-neutral-700 py-3 text-center transition hover:bg-neutral-600"
            >
              In den Warenkorb
            </button>
          </>
        ) : (
          <a
            href={buildMailtoLink(item)}
            className="mt-6 inline-block rounded-xl bg-neutral-700 py-3 text-center transition hover:bg-neutral-600"
          >
            Anfrage senden
          </a>
        )}
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
            href="#warenkorb"
            className="rounded-xl border border-white/10 px-4 py-3 text-sm transition hover:bg-white/5"
          >
            Warenkorb ({cart.reduce((sum, item) => sum + item.quantity, 0)})
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
              href="#warenkorb"
              className="rounded-xl border border-white/10 px-5 py-3 transition hover:bg-white/5"
            >
              Zum Warenkorb
            </a>
            <a
              href={contactLink()}
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

        <section
          id="warenkorb"
          className="rounded-2xl border border-white/10 bg-neutral-900 p-6"
        >
          <h2 className="text-2xl">Warenkorb</h2>

          {cart.length === 0 ? (
            <p className="mt-4 text-neutral-400">Dein Warenkorb ist leer.</p>
          ) : (
            <>
              <div className="mt-6 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col gap-4 rounded-xl border border-white/10 bg-neutral-800 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <h3 className="text-lg">{item.name}</h3>
                      <p className="text-sm text-neutral-400">
                        Einzelpreis: {formatPrice(item.price)}
                      </p>
                      <p className="text-sm text-neutral-400">
                        Gesamt: {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.name)}
                        className="h-10 w-10 rounded-lg bg-neutral-700 transition hover:bg-neutral-600"
                      >
                        -
                      </button>

                      <span className="min-w-[32px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.name)}
                        className="h-10 w-10 rounded-lg bg-neutral-700 transition hover:bg-neutral-600"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item.name)}
                        className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                      >
                        Entfernen
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-white/10 bg-neutral-800 p-5">
                <div className="flex justify-between text-neutral-300">
                  <span>Zwischensumme</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="mt-2 flex justify-between text-neutral-300">
                  <span>Versand</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>

                <div className="mt-4 flex justify-between text-lg font-semibold text-white">
                  <span>Gesamtsumme</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <p className="mt-4 text-sm text-neutral-400">
                 Bei Bestätigung der Bestellung werden die Bankdaten übermittelt.
                </p>

                <button
                  onClick={openCheckout}
                  className="mt-6 w-full rounded-xl bg-neutral-700 px-5 py-3 transition hover:bg-neutral-600"
                >
                  Bestellung abschließen
                </button>
              </div>
            </>
          )}
        </section>

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
            href={`mailto:${contactEmail}`}
            className="text-sm transition hover:text-white"
          >
            {contactEmail}
          </a>
        </div>
      </footer>

      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-neutral-900 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">Bestellung abschließen</h2>
              <button
                onClick={closeCheckout}
                className="rounded-lg px-3 py-2 text-neutral-400 transition hover:bg-white/5 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="name"
                value={customerData.name}
                onChange={handleCheckoutInput}
                placeholder="Name *"
                className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
              />
              <input
                type="email"
                name="email"
                value={customerData.email}
                onChange={handleCheckoutInput}
                placeholder="E-Mail *"
                className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
              />
              <input
                type="text"
                name="street"
                value={customerData.street}
                onChange={handleCheckoutInput}
                placeholder="Straße / Hausnummer *"
                className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500 md:col-span-2"
              />
              <input
                type="text"
                name="zip"
                value={customerData.zip}
                onChange={handleCheckoutInput}
                placeholder="PLZ *"
                className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
              />
              <input
                type="text"
                name="city"
                value={customerData.city}
                onChange={handleCheckoutInput}
                placeholder="Ort *"
                className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500"
              />
              <textarea
                name="note"
                value={customerData.note}
                onChange={handleCheckoutInput}
                placeholder="Hinweis zur Bestellung (optional)"
                rows={5}
                className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500 md:col-span-2"
              />

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-neutral-400">
                  Datei hochladen (optional)
                </label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="block w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-sm text-neutral-400"
                />
                {selectedFile && (
                  <p className="mt-2 text-sm text-neutral-400">
                    Ausgewählt: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Gesamtsumme</p>
                <p className="text-xl font-semibold">{formatPrice(total)}</p>
              </div>

              <button
                onClick={submitOrder}
                className="rounded-xl bg-neutral-700 px-5 py-3 transition hover:bg-neutral-600"
              >
                Bestellung per E-Mail senden
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
