'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PerfumeGalleryProps {
  images: string[]
  name: string
}

export default function PerfumeGallery({ images, name }: PerfumeGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div
        className="aspect-square rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: 'var(--smoke)' }}
      >
        <div className="text-center opacity-20">
          <div className="text-8xl mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>✦</div>
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
            Sem imagem
          </p>
        </div>
      </div>
    )
  }

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="flex flex-col gap-4">
      {/* Imagem principal */}
      <div className="relative aspect-square rounded-2xl overflow-hidden group">
        <Image
          src={images[activeIndex]}
          alt={`${name} - imagem ${activeIndex + 1}`}
          fill
          className="object-cover transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.2)] to-transparent" />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
              style={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                color: 'var(--gold)',
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
              style={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                color: 'var(--gold)',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200"
              style={{
                border: idx === activeIndex
                  ? '2px solid var(--gold)'
                  : '2px solid rgba(201,168,76,0.2)',
                opacity: idx === activeIndex ? 1 : 0.6,
              }}
            >
              <Image
                src={img}
                alt={`${name} miniatura ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
