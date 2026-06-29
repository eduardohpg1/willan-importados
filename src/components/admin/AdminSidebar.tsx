'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/lib/actions/auth'
import { LayoutDashboard, Package, Tags, Settings, LogOut, ExternalLink } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Painel', icon: LayoutDashboard },
  { href: '/admin/perfumes', label: 'Perfumes', icon: Package },
  { href: '/admin/marcas', label: 'Marcas', icon: Tags },
  { href: '/admin/configuracoes', label: 'Config', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* ── DESKTOP: sidebar lateral ── */}
      <aside
        className="hidden md:flex w-60 min-h-screen flex-col flex-shrink-0"
        style={{ backgroundColor: 'var(--charcoal)', borderRight: '1px solid rgba(201,168,76,0.1)' }}
      >
        <div className="p-6 pb-5" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <span className="text-xl font-bold tracking-widest uppercase block"
            style={{ fontFamily: '"Playfair Display", serif', color: 'var(--gold)' }}>
            Willan
          </span>
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(245,240,232,0.4)' }}>
            Painel Admin
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
            return (
              <Link key={href} href={href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200"
                style={{
                  backgroundColor: active ? 'rgba(201,168,76,0.12)' : 'transparent',
                  color: active ? 'var(--gold)' : 'rgba(245,240,232,0.6)',
                  border: active ? '1px solid rgba(201,168,76,0.25)' : '1px solid transparent',
                  fontWeight: active ? '500' : '400',
                }}>
                <Icon size={17} />{label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 space-y-1" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all hover:text-[var(--gold)]"
            style={{ color: 'rgba(245,240,232,0.45)' }}>
            <ExternalLink size={15} />Ver site
          </Link>
          <form action={logout}>
            <button type="submit"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm w-full text-left transition-all hover:text-red-400"
              style={{ color: 'rgba(245,240,232,0.45)' }}>
              <LogOut size={15} />Sair
            </button>
          </form>
        </div>
      </aside>

      {/* ── MOBILE: topbar ── */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{
          height: '52px',
          backgroundColor: 'var(--charcoal)',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
        }}
      >
        <span className="font-bold tracking-widest uppercase text-sm"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--gold)' }}>
          Willan Admin
        </span>
        <Link href="/" target="_blank"
          className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg"
          style={{ color: 'rgba(245,240,232,0.5)', border: '1px solid rgba(201,168,76,0.15)' }}>
          <ExternalLink size={11} />Ver site
        </Link>
      </header>

      {/* ── MOBILE: bottom nav ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex"
        style={{
          backgroundColor: 'var(--charcoal)',
          borderTop: '1px solid rgba(201,168,76,0.12)',
          height: '60px',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link key={href} href={href}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 active:opacity-60 transition-opacity"
              style={{ color: active ? 'var(--gold)' : 'rgba(245,240,232,0.35)' }}>
              <Icon size={20} />
              <span className="text-[9px] tracking-wide">{label}</span>
            </Link>
          )
        })}
        <form action={logout} className="flex flex-1">
          <button type="submit"
            className="flex flex-col items-center justify-center gap-0.5 w-full active:opacity-60"
            style={{ color: 'rgba(239,68,68,0.6)' }}>
            <LogOut size={20} />
            <span className="text-[9px] tracking-wide">Sair</span>
          </button>
        </form>
      </nav>
    </>
  )
}
