'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, MessageCircle, Phone } from 'lucide-react'

interface HeaderProps {
  onSearchOpen?: () => void
  whatsappNumber?: string
}

export default function Header({ onSearchOpen, whatsappNumber = '5511999999999' }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const waNumber = whatsappNumber.replace(/\D/g, '')
  const waUrl = `https://wa.me/${waNumber}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(10,10,10,0.97)' : 'var(--obsidian)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 30px rgba(0,0,0,0.5)' : 'none',
          borderBottom: '1px solid rgba(201,168,76,0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Esquerda: Hamburger + Busca */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
                style={{ color: 'rgba(245,240,232,0.7)' }}
                aria-label="Menu"
              >
                <span
                  className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: 'rgba(201,168,76,0.08)' }}
                />
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <button
                onClick={onSearchOpen}
                className="relative hidden sm:flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
                style={{ color: 'rgba(245,240,232,0.7)' }}
                aria-label="Buscar"
              >
                <span
                  className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: 'rgba(201,168,76,0.08)' }}
                />
                <Search size={18} />
              </button>
            </div>

            {/* Centro: Logo */}
            <Link href="/" className="flex flex-col items-center leading-none group select-none">
              <span
                className="transition-colors duration-300 group-hover:opacity-80"
                style={{ color: 'var(--gold)', fontSize: '10px', letterSpacing: '0.4em', marginBottom: '1px' }}
              >
                ✦ ✦ ✦
              </span>
              <span
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: 'var(--ivory)',
                  fontSize: 'clamp(20px, 3vw, 28px)',
                  fontWeight: 700,
                  letterSpacing: '0.3em',
                  lineHeight: 1,
                }}
              >
                WILLAN
              </span>
              <span
                style={{
                  color: 'var(--gold)',
                  fontSize: '9px',
                  letterSpacing: '0.55em',
                  marginTop: '3px',
                  fontWeight: 500,
                }}
              >
                IMPORTADOS
              </span>
            </Link>

            {/* Direita: WhatsApp CTA */}
            <div className="flex items-center gap-2">
              {/* Ícone WhatsApp simples (mobile) */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex sm:hidden items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
                style={{ color: '#25D366' }}
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.406A9.963 9.963 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.075-1.119l-.292-.173-3.032.856.842-3.108-.19-.302A7.948 7.948 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                </svg>
              </a>

              {/* Botão WhatsApp completo (desktop) */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: '#25D366',
                  color: '#fff',
                  letterSpacing: '0.03em',
                  boxShadow: '0 4px 15px rgba(37,211,102,0.3)',
                }}
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.406A9.963 9.963 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.075-1.119l-.292-.173-3.032.856.842-3.108-.19-.302A7.948 7.948 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                </svg>
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Linha dourada decorativa */}
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }}
        />
      </header>

      {/* Menu lateral deslizante */}
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          backdropFilter: 'blur(4px)',
        }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 bottom-0 z-50 w-72 flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: 'var(--charcoal)',
          borderRight: '1px solid rgba(201,168,76,0.12)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {/* Topo do drawer */}
        <div
          className="flex items-center justify-between px-5 py-5"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}
        >
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                color: 'var(--ivory)',
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.25em',
              }}
            >
              WILLAN
            </span>
            <span style={{ color: 'var(--gold)', fontSize: '9px', letterSpacing: '0.5em' }}>
              IMPORTADOS
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
            style={{ color: 'rgba(245,240,232,0.5)', border: '1px solid rgba(201,168,76,0.15)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Links de navegação */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {[
            { label: 'Início', href: '/', icon: '⌂' },
            { label: 'Catálogo', href: '/#catalogo', icon: '◈' },
            { label: 'Sobre mim', href: '/sobre', icon: '✦' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm tracking-wider uppercase transition-all duration-200"
              style={{ color: 'rgba(245,240,232,0.65)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.08)'
                e.currentTarget.style.color = 'var(--gold)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'rgba(245,240,232,0.65)'
              }}
            >
              <span style={{ color: 'var(--gold)', fontSize: '14px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Rodapé do drawer — botão WhatsApp */}
        <div className="px-4 py-6" style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:scale-[1.02]"
            style={{
              backgroundColor: '#25D366',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.406A9.963 9.963 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.075-1.119l-.292-.173-3.032.856.842-3.108-.19-.302A7.948 7.948 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
            </svg>
            Falar no WhatsApp
          </a>

          <p className="text-center mt-3 text-[10px]" style={{ color: 'rgba(245,240,232,0.25)', letterSpacing: '0.1em' }}>
            Atendimento via WhatsApp
          </p>
        </div>
      </div>
    </>
  )
}
