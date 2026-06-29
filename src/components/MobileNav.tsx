'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle, User, Package, Heart, Search } from 'lucide-react'

interface MobileNavProps {
  whatsappNumber: string
  onSearchOpen: () => void
}

export default function MobileNav({ whatsappNumber, onSearchOpen }: MobileNavProps) {
  const pathname = usePathname()

  const items = [
    {
      label: 'Contato',
      icon: MessageCircle,
      action: 'whatsapp',
    },
    {
      label: 'Desejos',
      icon: Heart,
      href: '/#mais-desejados',
    },
    {
      label: 'Buscar',
      icon: Search,
      action: 'search',
    },
    {
      label: 'Catálogo',
      icon: Package,
      href: '/#catalogo',
    },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
      style={{
        backgroundColor: 'var(--charcoal)',
        borderTop: '1px solid rgba(201,168,76,0.15)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="grid grid-cols-4 h-16">
        {items.map(({ label, icon: Icon, href, action }) => {
          if (action === 'whatsapp') {
            return (
              <a
                key={label}
                href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1 transition-colors active:opacity-70"
                style={{ color: 'rgba(245,240,232,0.5)' }}
              >
                <Icon size={20} />
                <span className="text-[10px] tracking-wide">{label}</span>
              </a>
            )
          }
          if (action === 'search') {
            return (
              <button
                key={label}
                onClick={onSearchOpen}
                className="flex flex-col items-center justify-center gap-1 transition-colors active:opacity-70 w-full"
                style={{ color: 'rgba(245,240,232,0.5)' }}
              >
                <Icon size={20} />
                <span className="text-[10px] tracking-wide">{label}</span>
              </button>
            )
          }
          return (
            <Link
              key={label}
              href={href!}
              className="flex flex-col items-center justify-center gap-1 transition-colors active:opacity-70"
              style={{ color: 'rgba(245,240,232,0.5)' }}
            >
              <Icon size={20} />
              <span className="text-[10px] tracking-wide">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
