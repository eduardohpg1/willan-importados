import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div
          className="text-8xl mb-6 opacity-20"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--gold)' }}
        >
          ✦
        </div>
        <h1
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}
        >
          Perfume não encontrado
        </h1>
        <p className="mb-8" style={{ color: 'rgba(245,240,232,0.55)' }}>
          Este perfume não está disponível no momento ou pode ter sido removido do catálogo.
        </p>
        <Link
          href="/#catalogo"
          className="inline-flex items-center gap-2 btn-gold px-8 py-3 rounded-full text-sm tracking-wider"
        >
          <ArrowLeft size={16} />
          <span>Ver Catálogo</span>
        </Link>
      </div>
    </div>
  )
}
