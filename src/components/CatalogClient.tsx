'use client'

import { useState, useMemo, useRef } from 'react'
import { Search, X } from 'lucide-react'
import PerfumeCard from '@/components/PerfumeCard'
import type { Perfume, Brand } from '@/types'

interface CatalogClientProps {
  perfumes: (Perfume & { brand?: Brand | null })[]
  whatsappNumber: string
  searchRef?: React.RefObject<{ focus: () => void } | null>
}

export default function CatalogClient({ perfumes, whatsappNumber, searchRef }: CatalogClientProps) {
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  if (searchRef) {
    (searchRef as any).current = { focus: () => inputRef.current?.focus() }
  }

  const filtered = useMemo(() => {
    if (!search) return perfumes
    return perfumes.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
    )
  }, [perfumes, search])

  return (
    <section id="catalogo" className="px-3 sm:px-6 max-w-7xl mx-auto pb-24 sm:pb-16">

      {/* Barra de busca */}
      <div className="relative mb-5">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--gold)' }}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar perfume ou marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-9 py-3 rounded-xl text-sm outline-none"
          style={{
            backgroundColor: 'var(--charcoal)',
            border: '1px solid rgba(201,168,76,0.2)',
            color: 'var(--ivory)',
          }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: 'rgba(245,240,232,0.4)' }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filtered.map((perfume) => (
            <PerfumeCard
              key={perfume.id}
              perfume={perfume}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-base mb-1" style={{ color: 'rgba(245,240,232,0.45)' }}>
            Nenhum resultado
          </p>
          <p className="text-sm mb-5" style={{ color: 'rgba(245,240,232,0.3)' }}>
            Tente outros termos de busca
          </p>
          <button
            onClick={() => setSearch('')}
            className="px-5 py-2 rounded-full text-sm"
            style={{ border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)' }}
          >
            Limpar busca
          </button>
        </div>
      )}

      {filtered.length > 0 && (
        <p className="text-center text-xs mt-8" style={{ color: 'rgba(245,240,232,0.25)' }}>
          {filtered.length} {filtered.length === 1 ? 'perfume' : 'perfumes'}
        </p>
      )}
    </section>
  )
}
