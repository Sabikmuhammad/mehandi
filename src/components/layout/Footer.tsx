import Link from "next/link";
import { Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory pt-20 pb-10 border-t border-gold/20 relative overflow-hidden">
      {/* Subtle Mehendi Pattern Overlay (Placeholder with CSS pattern) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex flex-col items-start mb-6">
              <span className="font-serif text-3xl font-medium leading-tight tracking-wide">
                RAIHANA
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-gold">
                Mehendi Artistry
              </span>
            </Link>
            <p className="text-ivory/80 max-w-sm font-serif italic text-lg mb-6">
              "Where Every Detail Tells a Story."
            </p>
            <p className="text-sm text-ivory/60">
              Mangaluru, Karnataka
            </p>
          </div>

          <div>
            <h4 className="text-gold uppercase tracking-widest text-sm mb-6 font-medium">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
              <li><Link href="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link></li>
              <li><Link href="/services" className="hover:text-gold transition-colors">Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold uppercase tracking-widest text-sm mb-6 font-medium">Connect</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> Instagram
                </a>
              </li>
              <li>
                <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Phone className="w-4 h-4" /> WhatsApp
                </a>
              </li>
              <li className="pt-4">
                <Link href="/book" className="inline-block px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-colors uppercase tracking-widest text-xs">
                  Enquire Now
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-ivory/10 text-xs text-ivory/50">
          <p>© {new Date().getFullYear()} Raihana Mehendi Artistry. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-ivory">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-ivory">Terms</Link>
            <Link href="/admin/login" className="hover:text-ivory">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
