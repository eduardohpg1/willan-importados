import Link from 'next/link'
import { Phone } from 'lucide-react'
import { getSettings } from '@/lib/actions/settings'
import { formatPhone } from '@/lib/utils'

export default async function Footer() {
  const settings = await getSettings()

  return (
    <footer
      id="contato"
      className="border-t"
      style={{
        borderColor: 'rgba(201, 168, 76, 0.15)',
        backgroundColor: 'var(--charcoal)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Marca */}
          <div>
            <div className="mb-4">
              <span
                className="text-3xl font-bold tracking-widest uppercase block"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: 'var(--gold)',
                }}
              >
                Willan
              </span>
              <span
                className="text-xs tracking-[0.4em] uppercase"
                style={{ color: 'var(--ivory-dark)' }}
              >
                Importados
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.6)' }}>
              Fragrâncias exclusivas que contam histórias únicas. Cada perfume é uma experiência sensorial inigualável.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-6 font-medium"
              style={{ color: 'var(--gold)' }}
            >
              Navegação
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Início', href: '/' },
                { label: 'Catálogo', href: '/#catalogo' },
                { label: 'Contato', href: '/#contato' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-[var(--gold)]"
                    style={{ color: 'rgba(245,240,232,0.7)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-6 font-medium"
              style={{ color: 'var(--gold)' }}
            >
              Contato
            </h4>
            <div className="space-y-4">
              <a
                href={`https://wa.me/${settings.whatsapp_number?.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-[var(--gold)]"
                style={{ color: 'rgba(245,240,232,0.7)' }}
              >
                <Phone size={16} style={{ color: 'var(--gold)' }} />
                {formatPhone(settings.whatsapp_number || '')}
              </a>
              <p className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
                Atendimento via WhatsApp
              </p>
            </div>
          </div>
        </div>

        <div className="line-gold my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>
            © {new Date().getFullYear()} Willan Importados. Todos os direitos reservados.
          </p>
          <Link
            href="/admin/login"
            className="text-xs transition-colors duration-200 hover:text-[var(--gold)]"
            style={{ color: 'rgba(245,240,232,0.3)' }}
          >
            Área Administrativa
          </Link>
        </div>
      </div>
    </footer>
  )
}
