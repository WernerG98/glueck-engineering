import { Link, NavLink } from "react-router-dom";

function navClassName({ isActive }) {
  return [
    "w-full rounded-xl border px-6 py-3 text-center transition md:w-auto",
    isActive
      ? "border-white/20 bg-white/10 text-white"
      : "border-white/10 text-white hover:bg-white/5",
  ].join(" ");
}

export default function Header({ onOpenContactModal }) {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:py-6">
        <Link to="/" className="flex items-center gap-4 sm:gap-6">
          <img
            src="/logo.png"
            alt="Glück Engineering Logo"
            className="h-16 w-16 object-contain sm:h-20 sm:w-20 md:h-28 md:w-28"
          />
          <span className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
            Glück Engineering
          </span>
        </Link>

        <div className="flex flex-col gap-3 md:flex-row">
          <NavLink to="/" className={navClassName} end>
            Startseite
          </NavLink>

          <NavLink to="/artworks" className={navClassName}>
            3D-Artworks
          </NavLink>

          <button
            onClick={() => onOpenContactModal("Allgemeine Anfrage", "general")}
            className="w-full rounded-xl border border-white/10 px-6 py-3 text-white transition hover:bg-white/5 md:w-auto"
          >
            Kontakt
          </button>
        </div>
      </div>
    </header>
  );
}
