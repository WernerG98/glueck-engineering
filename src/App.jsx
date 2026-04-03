import { useState } from "react";

export default function GlueckEngineeringWebsite() {
  const contactEmail = "info@glueckengineering.com";

  const fertigteile = [
    {
      name: "Führung für Blende / unterer Kühlergrill VW T4 (langer Vorderwagen)",
      image: "/Fuehrung_Blende_T4.png",
      text: "Passgenaue Führung für den unteren Kühlergrill des VW T4 mit langem Vorderwagen.",
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
    notes: "",
    quantity: "1",
    artworkColorMode: "",
    artworkWidth: "",
    artworkHeight: "",
    artworkFrame: "",
    artworkFrameColor: "",
    artworkQuantity: "1",
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

    try {
      setIsSending(true);

      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        body.append(key, value)
      );

      body.append("subject", requestSubject);
      body.append("type", requestType);

      if (attachment) body.append("attachment", attachment);

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
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSending(false);
    }
  };

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
        <span className="text-white">Coming soon</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl justify-between px-4 py-6">
          <div className="flex items-center gap-4">
            <img src="/logo.png" className="h-16 w-16" />
            <span className="text-2xl">Glück Engineering</span>
          </div>

          <button
            onClick={() => openContactModal("Allgemeine Anfrage", "general")}
            className="border px-4 py-2 rounded"
          >
            Kontakt
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl mb-10">
          Teile, die funktionieren. <br />
          Designs, die auffallen.
        </h1>

        <section className="mb-16">
          <h2 className="text-2xl mb-6">Fertigteile</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {fertigteile.map((item, i) => (
              <div key={i} className="bg-neutral-900 p-4 rounded-xl">
                <div className="aspect-square mb-4">
                  {renderFertigteilVisual(item)}
                </div>

                <h3>{item.name}</h3>
                <p className="text-sm text-neutral-400">{item.text}</p>

                <button
                  onClick={() => openContactModal(item.name, "product")}
                  className="mt-4 w-full bg-neutral-700 py-2 rounded"
                >
                  Anfrage senden
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl mb-6">Galerie</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className="cursor-pointer rounded-xl"
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 p-6 text-center text-sm text-neutral-400">
        © Glück Engineering · 94424 Arnstorf · {contactEmail}
      </footer>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center"
        >
          <img src={selectedImage} className="max-h-[80vh]" />
        </div>
      )}

      {contactModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center">
          <div className="bg-neutral-900 p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl mb-4">{requestSubject}</h2>

            <input
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
              className="w-full mb-2 p-2 bg-neutral-800"
            />
            <input
              name="email"
              placeholder="E-Mail"
              onChange={handleInputChange}
              className="w-full mb-2 p-2 bg-neutral-800"
            />

            <textarea
              name="notes"
              placeholder="Nachricht"
              onChange={handleInputChange}
              className="w-full mb-4 p-2 bg-neutral-800"
            />

            <button
              onClick={submitContactForm}
              className="bg-neutral-700 px-4 py-2 rounded"
            >
              Senden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
