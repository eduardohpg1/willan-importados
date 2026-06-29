'use client'

import Link from 'next/link'
import { MessageCircle, Package, Search } from 'lucide-react'

interface MobileNavProps {
  whatsappNumber: string
  onSearchOpen: () => void
}

export default function MobileNav({ whatsappNumber, onSearchOpen }: MobileNavProps) {
  const waUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent('Olá! Vim pelo site da Willan Importados e gostaria de saber mais.')}`

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
      style={{
        backgroundColor: 'var(--charcoal)',
        borderTop: '1px solid rgba(201,168,76,0.15)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="grid grid-cols-3 h-16">

        {/* Contato WhatsApp */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 active:opacity-70"
          style={{ color: 'rgba(245,240,232,0.5)' }}
        >
          <MessageCircle size={20} />
          <span className="text-[10px] tracking-wide">Contato</span>
        </a>

        {/* Buscar */}
        <button
          onClick={onSearchOpen}
          className="flex flex-col items-center justify-center gap-1 active:opacity-70 w-full"
          style={{ color: 'rgba(245,240,232,0.5)' }}
        >
          <Search size={20} />
          <span className="text-[10px] tracking-wide">Buscar</span>
        </button>

        {/* Catálogo */}
        <Link
          href="/#catalogo"
          className="flex flex-col items-center justify-center gap-1 active:opacity-70"
          style={{ color: 'rgba(245,240,232,0.5)' }}
        >
          <Package size={20} />
          <span className="text-[10px] tracking-wide">Catálogo</span>
        </Link>

      </div>
    </nav>
  )
}
