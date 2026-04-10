import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";
import ImageModal from "../components/ImageModal";
import GallerySection from "../components/sections/GallerySection";
import ArtworksProcessSection from "../components/sections/ArtworksProcessSection";
import useContactForm from "../hooks/useContactForm";
import {
  artworkGalleryImages,
  artworkInfoText,
  artworkIntroText,
} from "../data/artworks";

export default function ArtworksPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    contactModalOpen,
    requestSubject,
    requestType,
    formData,
    attachment,
    isSending,
    openContactModal,
    closeContactModal,
    handleInputChange,
    handleFileChange,
    submitContactForm,
  } = useContactForm();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header onOpenContactModal={openContactModal} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <section>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
            Individuelle 3D-Artworks
          </h1>

          <p className="mt-6 max-w-3xl text-sm text-neutral-400 sm:text-base">
            {artworkIntroText}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={() => openContactModal("Individuelles 3D-Artwork", "custom")}
              className="inline-block rounded-xl bg-neutral-700 px-6 py-3 text-center transition hover:bg-neutral-600"
            >
              Anfrage senden
            </button>

            <a
              href="#galerie"
              className="inline-block rounded-xl border border-white/10 px-6 py-3 text-center transition hover:bg-white/5"
            >
              Zur Galerie
            </a>

            <a
              href="#ablauf-artworks"
              className="inline-block rounded-xl border border-white/10 px-6 py-3 text-center transition hover:bg-white/5"
            >
              Zum Ablauf
            </a>
          </div>
        </section>

        <section className="mt-16 sm:mt-20">
          <div className="grid gap-6 rounded-2xl border border-white/10 bg-neutral-900 p-6 sm:gap-8 sm:p-8 md:grid-cols-2 md:items-center md:p-10">
            <div className="text-left">
              <h2 className="text-2xl font-semibold">Wichtige Informationen</h2>

              <div className="mt-4 whitespace-pre-line text-sm text-neutral-400 sm:text-base">
                {artworkInfoText}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/Artwork_Stanced_E46.png"
                alt="3D Artwork BMW E46"
                className="h-64 w-full cursor-pointer object-cover sm:h-80 md:h-full"
                onClick={() => setSelectedImage("/Artwork_Stanced_E46.png")}
              />
            </div>
          </div>
        </section>

        <GallerySection images={artworkGalleryImages} onPreview={setSelectedImage} />
        <ArtworksProcessSection />
      </main>

      <Footer />

      <ImageModal selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />

      <ContactModal
        contactModalOpen={contactModalOpen}
        requestSubject={requestSubject}
        requestType={requestType}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        attachment={attachment}
        closeContactModal={closeContactModal}
        submitContactForm={submitContactForm}
        isSending={isSending}
      />
    </div>
  );
}
