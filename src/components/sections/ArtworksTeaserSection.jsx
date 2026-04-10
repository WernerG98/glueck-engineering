import { Link } from "react-router-dom";

export default function ArtworksTeaserSection({ onRequest, onPreview }) {
  return (
    <section className="mt-16 sm:mt-20 md:mt-24">
      <div className="grid gap-6 rounded-2xl border border-white/10 bg-neutral-900 p-6 sm:gap-8 sm:p-8 md:grid-cols-2 md:items-center md:p-10">
        <div className="text-left">
          <h2 className="text-2xl font-semibold">Individuelle 3D-Artworks</h2>

          <p className="mt-4 text-sm text-neutral-400 sm:text-base">
            Wir verwandeln dein Motiv in ein mehrschichtiges 3D-Artwork mit ausgeprägter Tiefenwirkung. Möglich sind schwarz-weiße und mehrfarbige Ausführungen mit bis zu sechs Farben.
            <br />
            <br />
            Auf der eigenen Artwork-Seite findest du Beispiele, den Ablauf und alle wichtigen Informationen auf einen Blick.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/artworks"
              className="inline-block rounded-xl bg-neutral-700 px-6 py-3 text-center transition hover:bg-neutral-600"
            >
              Mehr erfahren
            </Link>

            <button
              onClick={() => onRequest("Individuelles 3D-Artwork", "custom")}
              className="inline-block rounded-xl border border-white/10 px-6 py-3 text-center transition hover:bg-white/5"
            >
              Direkt anfragen
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <img
            src="/Artwork_Stanced_E46.png"
            alt="3D Artwork BMW E46"
            className="h-64 w-full cursor-pointer object-cover sm:h-80 md:h-full"
            onClick={() => onPreview("/Artwork_Stanced_E46.png")}
          />
        </div>
      </div>
    </section>
  );
}
