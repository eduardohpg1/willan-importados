import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import type { Perfume } from '@/types'
import { buildWhatsAppUrl } from '@/lib/utils'

interface PerfumeCardProps {
  perfume: Perfume & { brand?: { name: string; slug: string } | null }
  whatsappNumber: string
}

export default function PerfumeCard({ perfume, whatsappNumber }: PerfumeCardProps) {
  const image = perfume.images?.[0]
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, perfume.name)

  return (
    <article className="perfume-card flex flex-col rounded-xl overflow-hidden"
      style={{ backgroundColor: 'var(--charcoal)' }}>

      {/* Imagem */}
      <Link href={`/perfumes/${perfume.slug}`} className="block relative overflow-hidden"
        style={{ aspectRatio: '3/4' }}>
        {image ? (
          <Image
            src={image}
            alt={perfume.name}
            fill
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'var(--smoke)' }}>
            <span style={{ color: 'rgba(201,168,76,0.3)', fontSize: '2rem' }}>✦</span>
          </div>
        )}

        {/* Overlay gradiente no rodapé da imagem */}
        <div className="absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.95), transparent)' }} />

        {/* Badge marca */}
        {perfume.brand && (
          <span
            className="absolute top-2 left-2 px-2 py-0.5 text-[10px] tracking-widest uppercase rounded font-medium"
            style={{
              backgroundColor: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(6px)',
              color: 'var(--gold)',
              border: '1px solid rgba(201,168,76,0.25)',
            }}
          >
            {perfume.brand.name}
          </span>
        )}

      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-2.5 pt-2">
        <Link href={`/perfumes/${perfume.slug}`}>
          <h3
            className="text-sm font-semibold leading-tight mb-1.5 line-clamp-1"
            style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}
          >
            {perfume.name}
          </h3>
        </Link>

        {/* Preço e parcelamento */}
        {perfume.price && (
          <div className="mb-2">
            <p className="text-sm font-bold" style={{ color: 'var(--gold)' }}>
              {perfume.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            {perfume.installments && perfume.installments > 1 && (
              <p className="text-[10px]" style={{ color: 'rgba(245,240,232,0.45)' }}>
                Em até {perfume.installments}x no cartão
              </p>
            )}
          </div>
        )}

        {/* Botão WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold flex items-center justify-center gap-1.5 w-full py-2 px-2 rounded-lg text-xs font-semibold mt-auto"
        >
          <MessageCircle size={13} />
          <span>Tenho Interesse</span>
        </a>
      </div>
    </article>
  )
}
