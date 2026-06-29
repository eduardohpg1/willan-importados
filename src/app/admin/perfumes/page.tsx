import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Package, Star } from 'lucide-react'
import { getPerfumes } from '@/lib/actions/perfumes'
import DeletePerfumeButton from '@/components/admin/DeletePerfumeButton'

export default async function AdminPerfumesPage() {
  const perfumes = await getPerfumes()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-bold mb-1"
            style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}
          >
            Perfumes
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.45)' }}>
            {perfumes.length} {perfumes.length === 1 ? 'perfume cadastrado' : 'perfumes cadastrados'}
          </p>
        </div>
        <Link
          href="/admin/perfumes/novo"
          className="btn-gold flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
        >
          <Plus size={16} />
          <span>Novo Perfume</span>
        </Link>
      </div>

      {perfumes.length === 0 ? (
        <div
          className="rounded-2xl p-16 text-center"
          style={{
            backgroundColor: 'var(--charcoal)',
            border: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          <Package size={40} className="mx-auto mb-4 opacity-20" style={{ color: 'var(--gold)' }} />
          <p className="text-lg mb-2" style={{ color: 'rgba(245,240,232,0.5)' }}>
            Nenhum perfume cadastrado
          </p>
          <Link
            href="/admin/perfumes/novo"
            className="inline-flex items-center gap-2 btn-gold mt-4 px-6 py-2.5 rounded-xl text-sm"
          >
            <Plus size={15} />
            <span>Cadastrar Primeiro Perfume</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {perfumes.map((perfume) => (
            <div
              key={perfume.id}
              className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
              style={{
                backgroundColor: 'var(--charcoal)',
                border: '1px solid rgba(201,168,76,0.08)',
              }}
            >
              {/* Miniatura */}
              <div
                className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
                style={{ backgroundColor: 'var(--smoke)' }}
              >
                {perfume.images?.[0] ? (
                  <Image
                    src={perfume.images[0]}
                    alt={perfume.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <Package size={20} style={{ color: 'var(--gold)' }} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3
                    className="font-semibold truncate"
                    style={{ color: 'var(--ivory)' }}
                  >
                    {perfume.name}
                  </h3>
                  {perfume.featured && (
                    <Star size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} fill="currentColor" />
                  )}
                </div>
                <p className="text-sm" style={{ color: 'rgba(245,240,232,0.45)' }}>
                  {perfume.brand?.name || 'Sem marca'} · {perfume.volume}
                </p>
              </div>

              {/* Ações */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/perfumes/${perfume.id}/editar`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                  style={{
                    border: '1px solid rgba(201,168,76,0.2)',
                    color: 'var(--gold)',
                  }}
                >
                  <Pencil size={13} />
                  Editar
                </Link>
                <DeletePerfumeButton id={perfume.id} name={perfume.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
