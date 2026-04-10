export default function Footer() {
  const contactEmail = "info@glueckengineering.com";
  const contactLink = `mailto:${contactEmail}`;

  return (
    <footer className="mt-16 border-t border-white/10 sm:mt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 text-neutral-500 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center md:grid md:grid-cols-3 md:items-center md:text-left">
          <div className="flex items-center justify-center gap-4 md:justify-start">
            <img
              src="/logo.png"
              alt="Glück Engineering Logo"
              className="h-14 w-14 object-contain md:h-16 md:w-16"
            />
            <span>© Glück Engineering</span>
          </div>

          <div className="text-center text-sm leading-tight">
            <div>Inhaber M.Eng. Werner Glück</div>
            <div className="text-neutral-400">94424 Arnstorf</div>
          </div>

          <div className="flex justify-center md:justify-end">
            <a href={contactLink} className="text-sm hover:text-white">
              {contactEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
