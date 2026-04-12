import Link from 'next/link';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--deep-charcoal)] pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-semibold text-white">
                Edwin Castro
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Providing direct, life-changing support to families and neighborhoods. 
              A personal commitment to rebuilding communities.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Heart className="w-4 h-4 text-[var(--accent-gold)] fill-[var(--accent-gold)]" />
              <span className="text-gray-500">100% Debt-Free Funding</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em] mb-6">
              Platform
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/story', label: 'The Vision' },
                { href: '/areas', label: 'How We Help' },
                { href: '/impact', label: 'Real Stories' },
                { href: '/apply', label: 'Request Support' },
                { href: '/faq', label: 'Common Questions' },
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em] mb-6">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:support@edwinmega.com" 
                className="flex items-center gap-3 text-gray-400 hover:text-[var(--accent-gold)] transition-colors duration-300 group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>support@edwinmega.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-500 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Responses typically sent within minutes during active review hours.</span>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em] mb-6">
              Legal
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/security', label: 'Security' },
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* BOTTOM SECTION: Copyright & Tagline */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-gray-300">
                © {currentYear} Edwin Castro
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Direct Community Support Initiative
              </p>
            </div>

            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
              Empowering The Next Chapter
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}
