'use client'

import Header from '@/components/Header'
import MobileNav from '@/components/MobileNav'

interface SiteShellProps {
  children: React.ReactNode
  whatsappNumber: string
}

const WA_SVG = (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.406A9.963 9.963 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.075-1.119l-.292-.173-3.032.856.842-3.108-.19-.302A7.948 7.948 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
  </svg>
)

export default function SiteShell({ children, whatsappNumber }: SiteShellProps) {
  const waUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent('Olá! Vim pelo site da Willan Importados e gostaria de saber mais.')}`

  function focusSearch() {
    const section = document.getElementById('catalogo')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        const input = section.querySelector('input[type="text"]') as HTMLInputElement | null
        input?.focus()
      }, 400)
    }
  }

  return (
    <>
      <Header onSearchOpen={focusSearch} whatsappNumber={whatsappNumber} />
      <main className="flex-1">{children}</main>
      <MobileNav whatsappNumber={whatsappNumber} onSearchOpen={focusSearch} />

      {/* FAB WhatsApp */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-24 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center gap-2.5 group"
      >
        {/* Label visível no hover (desktop) */}
        <span
          className="hidden sm:block text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap"
          style={{
            backgroundColor: '#25D366',
            color: '#fff',
            boxShadow: '0 2px 12px rgba(37,211,102,0.4)',
          }}
        >
          Falar no WhatsApp
        </span>

        {/* Botão circular */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            backgroundColor: '#25D366',
            color: '#fff',
            boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
          }}
        >
          {WA_SVG}
        </div>
      </a>
    </>
  )
}
