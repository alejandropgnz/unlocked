import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";
import { Wordmark } from "./Wordmark";

/**
 * Site footer. Visible on desktop. Hidden on mobile (BottomNav serves as
 * primary nav; less screen real estate).
 *
 * Sections:
 * - Top row: brand + social icons
 * - Tagline: short product positioning
 * - Bottom: copyright + legal link + contact
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="hidden md:block border-t border-white/5 mt-12 py-10 px-6 lg:px-8 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" aria-label="Unlocky — Inicio" className="hover:text-gold transition">
            <Wordmark size="md" />
          </Link>
          <div className="flex gap-2">
            <a
              href="https://instagram.com/unlockyapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-muted hover:text-white hover:bg-surface/70 transition"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/unlockyapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-muted hover:text-white hover:bg-surface/70 transition"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        <p className="text-xs text-muted mb-6 max-w-md">
          Colecciona los logros más absurdos de tu vida. Comparte tu colección
          y descubre la rareza real de cada momento.
        </p>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            © {year} Unlocky · Hecho en España
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/legal"
              className="text-xs text-muted hover:text-white transition"
            >
              Privacidad y términos
            </Link>
            <a
              href="mailto:hola@unlocky.app"
              className="text-xs text-muted hover:text-white transition"
            >
              hola@unlocky.app
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
