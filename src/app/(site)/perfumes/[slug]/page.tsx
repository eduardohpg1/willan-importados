export const revalidate = 0

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Tag, ChevronRight, ShieldCheck, Star, Truck } from 'lucide-react'
import { getPerfumeBySlug, getRelatedPerfumes } from '@/lib/actions/perfumes'
import { getSettings } from '@/lib/actions/settings'
import { buildWhatsAppUrl } from '@/lib/utils'
import PerfumeGallery from '@/components/PerfumeGallery'
import PerfumeCard from '@/components/PerfumeCard'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const perfume = await getPerfumeBySlug(slug)
  if (!perfume) return { title: 'Perfume não encontrado' }

  return {
    title: `${perfume.name} | Willan Importados`,
    description: perfume.description?.slice(0, 160) || `Conheça o ${perfume.name} na Willan Importados.`,
  }
}

export default async function PerfumePage({ params }: Props) {
  const { slug } = await params
  const [perfume, settings] = await Promise.all([
    getPerfumeBySlug(slug),
    getSettings(),
  ])

  if (!perfume) notFound()

  const whatsappNumber = settings?.whatsapp_number || '5511999999999'
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, perfume.name)

  const related = perfume.brand_id
    ? await getRelatedPerfumes(perfume.brand_id, perfume.id)
    : []

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10 text-sm" style={{ color: 'rgba(245,240,232,0.4)' }}>
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">Início</Link>
          <ChevronRight size={14} />
          <Link href="/#catalogo" className="hover:text-[var(--gold)] transition-colors">Catálogo</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--gold)' }}>{perfume.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Galeria */}
          <div>
            <PerfumeGallery images={perfume.images} name={perfume.name} />
          </div>

          {/* Informações */}
          <div className="flex flex-col">

            {/* Marca */}
            {perfume.brand && (
              <div
                className="inline-flex items-center gap-1.5 text-xs tracking-[0.3em] uppercase mb-3 w-fit px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: 'var(--gold)',
                }}
              >
                <Tag size={11} />
                {perfume.brand.name}
              </div>
            )}

            {/* Nome */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}
            >
              {perfume.name}
            </h1>

            {/* Esgotado */}
            {perfume.out_of_stock && (
              <div
                className="inline-flex items-center gap-1.5 text-xs tracking-[0.3em] uppercase mb-3 w-fit px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#f87171',
                }}
              >
                Produto Esgotado
              </div>
            )}

            {/* Preço */}
            {perfume.price && (
              <div className="mb-5">
                <p
                  className="text-3xl font-bold"
                  style={{ color: 'var(--gold)', fontFamily: '"Playfair Display", serif' }}
                >
                  {perfume.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                {perfume.installments && perfume.installments > 1 && (
                  <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
                    Em até {perfume.installments}x no cartão
                  </p>
                )}
              </div>
            )}

            {/* Linha separadora */}
            <div
              className="mb-6"
              style={{ height: '1px', background: 'linear-gradient(90deg, rgba(201,168,76,0.4), transparent)' }}
            />

            {/* Descrição */}
            {perfume.description && (
              <div className="mb-6">
                <h2 className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
                  Sobre este perfume
                </h2>
                <p className="leading-relaxed text-base" style={{ color: 'rgba(245,240,232,0.75)' }}>
                  {perfume.description}
                </p>
              </div>
            )}

            {/* Selos de confiança */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: ShieldCheck, label: '100% Original' },
                { icon: Star, label: 'Premium' },
                { icon: Truck, label: 'Entrega Rápida' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-center"
                  style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <Icon size={16} style={{ color: 'var(--gold)' }} />
                  <span className="text-[10px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.5)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA WhatsApp */}
            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: 'var(--charcoal)', border: '1px solid rgba(201,168,76,0.12)' }}
            >
              {perfume.out_of_stock ? (
                <>
                  <p
                    className="text-base font-semibold mb-1"
                    style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}
                  >
                    Este perfume está esgotado
                  </p>
                  <p className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
                    Fale conosco pelo WhatsApp para saber sobre reposição e opções similares.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl text-sm font-bold tracking-wide mt-4 transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      border: '1px solid rgba(201,168,76,0.3)',
                      color: 'var(--gold)',
                    }}
                  >
                    <MessageCircle size={18} />
                    Perguntar sobre reposição
                  </a>
                </>
              ) : (
                <>
                  <p className="text-sm mb-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
                    Interessado neste perfume?
                  </p>
                  <p
                    className="text-base font-semibold mb-4"
                    style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}
                  >
                    Fale conosco pelo WhatsApp
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      backgroundColor: '#25D366',
                      color: '#fff',
                      boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.406A9.963 9.963 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.075-1.119l-.292-.173-3.032.856.842-3.108-.19-.302A7.948 7.948 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                    </svg>
                    Tenho Interesse em {perfume.name}
                  </a>
                  <p className="text-center text-[10px] mt-2.5" style={{ color: 'rgba(245,240,232,0.3)' }}>
                    Mensagem pré-preenchida com o nome do perfume
                  </p>
                </>
              )}
            </div>

            {/* Voltar */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-5 text-sm transition-colors hover:text-[var(--gold)]"
              style={{ color: 'rgba(245,240,232,0.35)' }}
            >
              <ArrowLeft size={15} />
              Voltar ao catálogo
            </Link>
          </div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <div className="mt-20">
            <div
              className="mb-12"
              style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }}
            />
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
                Da mesma marca
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}
              >
                Você também pode gostar
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <PerfumeCard key={p.id} perfume={p} whatsappNumber={whatsappNumber} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
