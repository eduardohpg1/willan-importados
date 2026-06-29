'use client'

import Header from '@/components/Header'
import MobileNav from '@/components/MobileNav'

interface SiteShellProps {
  children: React.ReactNode
  whatsappNumber: string
}

export default function SiteShell({ children, whatsappNumber }: SiteShellProps) {
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
    </>
  )
}
