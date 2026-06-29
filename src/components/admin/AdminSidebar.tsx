'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/lib/actions/auth'
import {
  LayoutDashboard,
  Package,
  Tags,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Painel', icon: LayoutDashboard },
  { href: '/admin/perfumes', label: 'Perfumes', icon: Package },
  { href: '/admin/marcas', label: 'Marcas', icon: Tags },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="w-64 min-h-screen flex flex-col"
      style={{
        backgroundColor: 'var(--charcoal)',
        borderRight: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      {/* Logo */}
      <div
        className="p-6 pb-5"
        style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
      >
        <span
          className="text-xl font-bold tracking-widest uppercase block"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--gold)' }}
        >
          Willan
        </span>
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: 'rgba(245,240,232,0.4)' }}
        >
          Painel Admin
        </span>
      </div>

      {/* Navegação */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200"
              style={{
                backgroundColor: isActive
                  ? 'rgba(201,168,76,0.12)'
                  : 'transparent',
                color: isActive ? 'var(--gold)' : 'rgba(245,240,232,0.6)',
                border: isActive
                  ? '1px solid rgba(201,168,76,0.25)'
                  : '1px solid transparent',
                fontWeight: isActive ? '500' : '400',
              }}
            >
              <Icon size={17} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div
        className="p-4 space-y-2"
        style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
      >
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all hover:text-[var(--gold)]"
          style={{ color: 'rgba(245,240,232,0.45)' }}
        >
          <ExternalLink size={15} />
          Ver site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm w-full text-left transition-all hover:text-red-400"
            style={{ color: 'rgba(245,240,232,0.45)' }}
          >
            <LogOut size={15} />
            Sair
          </button>
        </form>
      </div>
    </aside>
  )
}
