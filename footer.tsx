import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

const footerLinks = {
  navigation: [
    { name: 'Accueil', href: '/' },
    { name: 'Salles', href: '/salles' },
    { name: 'A propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Conditions d\'utilisation', href: '/conditions' },
    { name: 'Politique de confidentialite', href: '/confidentialite' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <span className="text-2xl font-bold">EasyEvent</span>
              <span className="text-sm text-background/70 ml-1">Annaba</span>
            </div>
            <p className="text-sm text-background/70">
              La plateforme de reference pour la reservation de salles d&apos;evenements a Annaba, Algerie.
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Informations legales</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Centre-ville, Annaba 23000, Algerie</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+213 38 XX XX XX</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contact@easyevent.dz</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-background/20">
          <p className="text-center text-sm text-background/50">
            &copy; {new Date().getFullYear()} EasyEvent Annaba. Tous droits reserves.
          </p>
        </div>
      </div>
    </footer>
  )
}
